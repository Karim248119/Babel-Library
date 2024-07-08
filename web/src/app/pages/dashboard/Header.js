import { Button } from "@/components/ui/button";
import React from "react";

const Header = ({ setIsAdding }) => {
  return (
    <header className=" w-[80%] h-[20vh] m-auto rounded-b-3xl bg-gray relative">
      <div className=" absolute  top-1/2 -translate-y-1/2 right-20 ">
        <Button className="scale-125" onClick={() => setIsAdding(true)}>
          Add Book
        </Button>
      </div>
      <div className=" absolute  top-1/2 -translate-y-1/2 left-20 ">
        <Button className="scale-125">log out</Button>
      </div>
      <div className=" absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <button onClick={() => setIsAdding(true)}>
          <img
            src="../../pics/babel.png"
            className=" h-52 w-52 hover:scale-110 transition-all"
          ></img>
        </button>
      </div>
    </header>
  );
};

export default Header;
