import React from "react";
import { Avatar } from "./index.js";

function ChatItem() {
  return (
    <div className="w-full h-[75px] rounded-md p-1 flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-all ease-in-out duration-300">
      <Avatar />
      <div>
        <h2 className="font-bold">Pratik Tele</h2>
        <p className="text-gray-500 text-sm">This is latest message</p>
      </div>
    </div>
  );
}

export default ChatItem;
