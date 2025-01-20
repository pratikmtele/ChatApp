import React from "react";
import { Avatar } from "./index.js";

function ReceiverMessage({ avatar, content, date }) {
  return (
    <div className="w-full min-h-fit mb-4">
      <div className="w-fit h-fit flex gap-3 items-end group">
        <Avatar avatar={avatar} />
        <div className="bg-blue-500 p-2 rounded-md">
          <p className="text-white content-center max-w-[400px]">{content}</p>
          <p className="text-sm text-gray-200 float-left mt-1">
            {new Date(date).toLocaleTimeString()}
          </p>
        </div>
        <i class="fa-solid fa-ellipsis-vertical invisible group-hover:visible cursor-pointer"></i>
      </div>
    </div>
  );
}

export default ReceiverMessage;
