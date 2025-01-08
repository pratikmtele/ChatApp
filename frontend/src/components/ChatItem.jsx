import React from "react";
import { Avatar } from "./index.js";

function ChatItem({ avatar, fullname, latestMessage }) {
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="w-full h-[75px] rounded-md p-1 flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-all ease-in-out duration-300">
      <Avatar avatar={avatar} />
      <div>
        <h2 className="font-bold">{fullname}</h2>
        <p className="text-gray-500 text-sm">
          {truncateText(latestMessage, 45)}
        </p>
      </div>
    </div>
  );
}

export default ChatItem;
