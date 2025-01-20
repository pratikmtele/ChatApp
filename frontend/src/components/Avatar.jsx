import React from "react";
import { Avatar as AvatarImage } from "../assets/index.js";

function Avatar({ className, avatar, active }) {
  return (
    <div className="ml-3 w-12 h-12 rounded-full relative">
      <img
        src={avatar ? avatar : AvatarImage}
        className={`object-cover w-12 h-12 rounded-full ${className}`}
      />
      {active ? (
        <div className="w-3 h-3 bg-green-500 absolute rounded-full bottom-1 right-0 border-2 border-white"></div>
      ) : null}
    </div>
  );
}

export default Avatar;
