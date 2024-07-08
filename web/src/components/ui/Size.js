"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { check } from "@heroicons/react/solid";

import * as OutlineIcons from "@heroicons/react/outline";
export function Size({ sizes, setSizes }) {
  const SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
  const [includes, setIncludes] = useState(false);
  const handleAddSize = (s) => {
    if (!sizes.includes(s)) {
      setSizes([...sizes, s]);
    } else {
      const updatedSizes = sizes.filter((t) => t !== s);
      setSizes(updatedSizes);
    }
  };
  return (
    <div className="flex gap-5">
      {SIZES.map((s, i) => (
        <div key={i} className="flex space-x-2 my-1 items-center ">
          <label
            htmlFor="terms1"
            className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {s}
          </label>

          <button
            type="button"
            id="terms1"
            className="  text-white w-5 h-5 rounded-sm flex justify-center items-center"
            onClick={() => handleAddSize(s)}
            style={{
              backgroundColor: !sizes.includes(s) ? "white" : "#F63A52",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="grid gap-1.5 leading-none"></div>
        </div>
      ))}
    </div>
  );
}
