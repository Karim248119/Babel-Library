import React, { useState } from "react";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";

import db from "@/config/firestore";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Category } from "@/components/ui/Category";
import { Size } from "@/components/ui/Size";

export default function Edit({
  selectedBook,
  Books,
  getBooks,
  setBooks,
  setIsEditing,
}) {
  const [name, setName] = useState(selectedBook.name);
  const [description, setDescription] = useState(selectedBook.description);
  const [bookSrc, setBookSrc] = useState(selectedBook.bookSrc);
  const [chaptersNo, setchaptersNo] = useState(selectedBook.chaptersNo);
  const [page, setpage] = useState(selectedBook.page);
  const [rate, setrate] = useState(selectedBook.rate);
  const [reviewrs, setreviewrs] = useState(selectedBook.reviewrs);
  const [cover, setcover] = useState(selectedBook.cover);
  const [date, setdate] = useState(selectedBook.date);
  const [chapterName, setChapterName] = useState("");
  const [chapterImg, setchapterImg] = useState("");
  const [chapterPDF, setchapterPDF] = useState("");
  const [chapterSrc, setchapterSrc] = useState("");
  const [chapters, setchapters] = useState(selectedBook.chapters);

  const id = selectedBook.id;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const Book = {
      name,
      page,
      date,
      rate,
      reviewrs,
      description,
      chaptersNo,
      bookSrc,
      cover,
      chapters,
    };

    await setDoc(doc(db, "Books", id), {
      ...Book,
    });

    setBooks(Books);
    setIsEditing(false);
    getBooks();

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleAddImgs = () => {
    if (imgsInput.length > 0) setImgs([...imgs, imgsInput]);
    setImgsInput("");
  };

  const handleDeleteChapter = (index) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Color ?",

      text: "You won't be able to recover this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const updatedChapters = [...chapters];
        updatedChapters.splice(index, 1);
        setchapters(updatedChapters);
      }
    });
  };

  const handleAddchapters = () => {
    if ( chapterImg && chapterSrc) {
      const newBook = {
        name: chapterName,
        img: chapterImg,
        pdf: chapterPDF,
        src: chapterSrc,
      };
      setchapters([...chapters, newBook]);
      setChapterName("");
      setchapterImg("");
      setchapterPDF("");
      setchapterSrc("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Both book name and book image are required.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="w-[60%] m-auto py-10 min-h-screen  ">
      <form
        onSubmit={handleUpdate}
        className=" flex flex-col gap-8  bg-black p-10 pt-24 rounded-2xl relative"
      >
        <div className="flex flex-col gap-2">
          <Label className="text-gray" htmlFor="name">
            Book Name
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-gray" htmlFor="description">
            Description
          </Label>
          <Input
            id="description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-gray" htmlFor="booksrc">
            book source
          </Label>
          <Input
            id="description"
            type="text"
            name="booksrc"
            value={bookSrc}
            onChange={(e) => setBookSrc(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-gray" htmlFor="chaptersNo">
           number of chapters
          </Label>
          <Input
            id="description"
            type="text"
            name="chaptersNo"
            value={chaptersNo}
            onChange={(e) => setchaptersNo(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-gray" htmlFor="description">
            date
          </Label>
          <Input
            id="date"
            type="text"
            name="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 w-[45%]">
            <Label className="text-gray" htmlFor="page">
              page
            </Label>
            <Input
              id="page"
              type="number"
              name="page"
              value={page}
              onChange={(e) => setpage(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2  w-[45%]">
            <Label className="text-gray" htmlFor="reviewrs">
              reviewrs
            </Label>
            <Input
              id="reviewrs"
              type="number"
              name="reviewrs"
              value={reviewrs}
              onChange={(e) => setreviewrs(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 w-[45%]">
            <Label className="text-gray" htmlFor="rate">
              rate
            </Label>
            <Input
              id="rate"
              type="number"
              name="rate"
              value={rate}
              onChange={(e) => setrate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2  w-[45%]">
            <Label className="text-gray" htmlFor="cover">
              cover
            </Label>
            <Input
              id="cover"
              type="text"
              name="cover"
              value={cover}
              onChange={(e) => setcover(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label className="text-gray" htmlFor="bookNmae">
            chapters Name
          </Label>
          <Input
            id="bookNmae"
            type="text"
            name="bookNmae"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
          />
          <Label className="text-gray mt-10" htmlFor="chapterImg">
            chapters Image
          </Label>
          <Input
            id="chapterImg"
            type="text"
            name="chapterImg"
            value={chapterImg}
            onChange={(e) => setchapterImg(e.target.value)}
          />
          <div className=" my-6 flex gap-3 flex-wrap">
            {chapters.map((chapter, i) => {
              return (
                <img
                  src={chapter.img}
                  key={i}
                  className=" rou h-20 w-20 rounded-lg"
                  onClick={() => {
                    handleDeleteChapter(i);
                  }}
                />
              );
            })}
          </div>
          {/* <Label className="text-gray mt-10" htmlFor="chapterPDF">
            chapterpdf
          </Label>
          <Input
            id="chapterPDF"
            type="text"
            name="chapterPDF"
            value={chapterPDF}
            onChange={(e) => setchapterPDF(e.target.value)}
          /> */}
          <Label className="text-gray mt-10" htmlFor="chapterPDF">
            chapter source
          </Label>
          <Input
            id="chapterSrc"
            type="text"
            name="chapterSrc"
            value={chapterSrc}
            onChange={(e) => setchapterSrc(e.target.value)}
          />
          <Button
            className="bg-gray text-black hover:text-white mt-5"
            type="button"
            onClick={handleAddchapters}
          >
            Add
          </Button>
        </div>
        <div
          style={{
            marginTop: "30px",
            alignSelf: "center",
            gap: 50,
            display: "flex",
          }}
        >
          <Button
            type="submit"
            value="Add"
            className="scale-150 bg-gray text-black hover:text-white"
          >
            Submit
          </Button>
          <Button
            style={{ marginLeft: "12px" }}
            className="muted-button scale-150 bg-gray text-black hover:text-white"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
