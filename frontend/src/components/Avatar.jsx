import React from "react";
import { Avatar as AvatarImage } from "../assets/index.js";

function Avatar({ className }) {
  return (
    <div className="ml-3 w-12 h-12 rounded-full">
      <img
        src={AvatarImage}
        className={`object-cover w-full h-full ${className}`}
      />
    </div>
  );
}

export default Avatar;
