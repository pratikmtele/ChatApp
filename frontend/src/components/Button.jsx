import React from "react";
import { LoadingImage } from "../assets/index.js";

function Button({ label, className, type, pending, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} flex justify-center items-center`}
    >
      {pending ? (
        <img src={LoadingImage} alt="Loading..." className="w-6" />
      ) : (
        label
      )}
    </button>
  );
}

export default Button;
