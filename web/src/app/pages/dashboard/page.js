"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Content from "./Table";
import db from "@/config/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Add from "./Add";
import Header from "./Header";
import Edit from "./Edit";

export default function Dashboard() {
  const [Books, setBooks] = useState();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "Books"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBooks(data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        icon: "warning",
        color: "#F63A52",

        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      })
      .then((result) => {
        if (result.value) {
          const [Book] = Books.filter((Book) => Book.id === id);

          deleteDoc(doc(db, "Books", id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `${Book.firstName} ${Book.lastName}'s data has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });

          const BooksCopy = Books.filter((Book) => Book.id !== id);
          setBooks(BooksCopy);
        }
      });
  };
  const handleEdit = (id) => {
    const [Book] = Books.filter((Book) => Book.id === id);
    setSelectedBook(Book);
    setIsEditing(true);
  };
  return (
    <div>
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />
          <div className=" p-24">
            <Content
              Books={Books}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        </>
      )}

      {isAdding && (
        <Add
          Books={Books}
          setIsAdding={setIsAdding}
          setBooks={setBooks}
          getBooks={getBooks}
        />
      )}
      {isEditing && (
        <Edit
          Books={Books}
          selectedBook={selectedBook}
          setBooks={setBooks}
          setIsEditing={setIsEditing}
          getBooks={getBooks}
        />
      )}
    </div>
  );
}
