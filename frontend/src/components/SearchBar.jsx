import React from "react";
import { Input } from "./index.js";

function SearchBar({ className, iconClassName, value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Input
        className={`border border-gray-300 h-10 pl-10 rounded-md outline-none hover:border-black transition-all ease-in-out duration-200 ${className}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <i
        class={`fa-solid fa-magnifying-glass absolute left-3 ${iconClassName}`}
      ></i>
    </div>
  );
}

export default SearchBar;
