"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";

export default function Content({ Books, handleDelete, handleEdit }) {
  const [searchInput, setSearchInput] = useState("");

  // Function to handle changes in the search input
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Ensure Books is initialized before filtering
  const filteredBooks = Books
    ? Books.filter((Book) =>
        Book.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  return (
    <div className="">
      <input
        type="text"
        placeholder="ابحث عن كتاب"
        value={searchInput}
        onChange={handleSearchInputChange}
        className="m-auto w-full rounded-t-lg p-4 outline-none border-4 border-b-0  border-black text-right"
      />

      <Table className="m-auto rounded-b-3xl overflow-hidden">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className=" bg-black h-28 hover:bg-black text-center ">
            <TableHead className=" text-white font-bold text-xl text-center ">
              Name
            </TableHead>
            <TableHead className=" text-white font-bold text-xl text-center">
              Rate
            </TableHead>
            <TableHead className=" text-white font-bold text-xl text-center">
              Description
            </TableHead>
            <TableHead className=" text-white font-bold text-xl text-center">
              Pages
            </TableHead>
            <TableHead className=" text-white font-bold text-xl text-center">
              Image
            </TableHead>

            <TableHead className=" text-white font-bold text-xl text-center">
              buttons
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Books &&
            (filteredBooks || Books).map((Book) => {
              return (
                <TableRow key={Book.id}>
                  <TableCell className="font-medium bg-gray text-black text-center">
                    {Book.name}
                  </TableCell>
                  <TableCell className="bg-gray text-black text-center">
                    {Book.rate}
                  </TableCell>
                  <TableCell className="bg-gray text-black text-center w-[25%] text-wrap">
                    {Book.description}{" "}
                  </TableCell>

                  <TableCell className="bg-gray text-black text-center">
                    {Book.page}
                  </TableCell>

                  {Book.cover && (
                    <TableCell className="bg-gray text-center ">
                      <div className=" w-full h-full justify-center flex">
                        <div>
                          <img src={Book.cover} className=" h-24 rounded-lg" />
                        </div>
                      </div>
                    </TableCell>
                  )}

                  <TableCell className="bg-gray text-center  ">
                    <div className=" m-auto">
                      <Button
                        className="bg-white mx-5 text-black hover:text-white"
                        onClick={() => handleEdit(Book.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-600 hover:text-white"
                        onClick={() => handleDelete(Book.id)}
                      >
                        delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
