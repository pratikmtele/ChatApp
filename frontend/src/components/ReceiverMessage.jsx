import React from "react";
import { Avatar } from "./index.js";

function ReceiverMessage({ avatar, content, date, fileUrl }) {
  return (
    <div className="w-full min-h-fit mb-4">
      <div className="w-fit h-fit flex gap-3 items-end group">
        <Avatar avatar={avatar} />
        <div className="bg-blue-500 max-w-[300px] p-2 rounded-md">
          {fileUrl && <img src={fileUrl} className="bg-white w-full mb-1" />}
          <p className="text-white content-center max-w-[400px]">{content}</p>
          <p className="text-sm text-gray-200 float-left mt-1">
            {new Date(date).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReceiverMessage;
