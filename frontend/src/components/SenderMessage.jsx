import React from "react";
import { Avatar } from "./index.js";
import { ForgetPasswordImage } from "../assets/index.js";

function SenderMessage({ avatar, content, date }) {
  return (
    <div className="w-full min-h-fit mb-3">
      <div className="w-fit h-fit py-4 px-1 flex flex-row-reverse gap-3 items-end float-right group">
        <Avatar avatar={avatar} />
        <div className="bg-slate-200 p-2 rounded-md">
          {/* <img src={ForgetPasswordImage} className="bg-white w-32 mb-1" /> */}
          <p className=" text-black content-center max-w-[400px]">{content}</p>
          <p className=" float-end text-sm text-gray-500 mt-1">
            {new Date(date).toLocaleTimeString()}
          </p>
        </div>
        <i class="fa-solid fa-ellipsis-vertical invisible group-hover:visible cursor-pointer"></i>
      </div>
    </div>
  );
}

export default SenderMessage;
