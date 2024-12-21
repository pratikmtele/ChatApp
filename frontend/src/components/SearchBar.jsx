import React from "react";
import { Input } from "./index.js";

function SearchBar() {
  return (
    <div className="relative">
      <Input
        className="border border-gray-300 h-10 pl-10 mt-5 rounded-md outline-none hover:border-black transition-all ease-in-out duration-200"
        type="text"
        placeholder="Search messages or users"
      />
      <i class="fa-solid fa-magnifying-glass absolute top-[32px] left-3"></i>
    </div>
  );
}

export default SearchBar;
