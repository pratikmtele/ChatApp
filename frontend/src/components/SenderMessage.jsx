import React, { useState } from "react";
import { Avatar } from "./index.js";

function SenderMessage({ avatar, content, date, onClick, fileUrl }) {
  const [isMessageMenuOpen, setIsMessageMenuOpen] = useState(false);
  return (
    <div className="w-full  min-h-fit mb-3">
      <div className="w-fit h-fit py-4 px-1 flex flex-row-reverse gap-3 items-end float-right group">
        <Avatar avatar={avatar} />
        <div className="bg-slate-200 max-w-[300px] p-2 rounded-md">
          {fileUrl && <img src={fileUrl} className="bg-white w-full mb-1" />}
          <p className=" text-black content-center max-w-[400px]">
            {content ? content : ""}
          </p>
          <p className=" float-end text-sm text-gray-500 mt-1">
            {new Date(date).toLocaleTimeString()}
          </p>
        </div>
        <i
          class="fa-solid fa-ellipsis-vertical invisible group-hover:visible cursor-pointer"
          onClick={() => setIsMessageMenuOpen((prev) => !prev)}
        ></i>

        {isMessageMenuOpen && (
          <div className="w-fit h-full px-3 cursor-pointer py-1 bg-white shadow-md">
            <h1 className="text-sm" onClick={onClick}>
              Delete
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default SenderMessage;
