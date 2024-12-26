import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Input,
  SenderMessage,
  ReceiverMessage,
  SearchBar,
} from "./index.js";
import { SendMessageImage } from "../assets/index.js";

function ChatContainer() {
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messageInput = useRef(null);

  useEffect(() => {
    if (messageInput?.current) {
      messageInput.current.focus();
    }
  }, []);

  return (
    <>
      <div className="border-b border-l-0 border-r-0 border-t-0 border-gray-300 h-20 flex justify-between pr-2 bg-white bg-opacity-50 backdrop-blur-md">
        <div className="flex gap-3 items-center ml-4">
          <Avatar />
          <h1 className="font-semibold">Pratik Tele</h1>
        </div>
        <div className="flex gap-8 items-center mr-5 relative drop-shadow-md">
          <i
            class="fa-solid fa-magnifying-glass text-gray-600 cursor-pointer"
            onClick={() => {
              setIsSearchbarOpen((prev) => !prev);
              setIsMenuOpen(false);
            }}
          ></i>

          {/* Search bar  */}
          <div
            className={`absolute right-28 px-2  bg-white w-[300px] -bottom-12 ${
              isSearchbarOpen ? " opacity-100" : "opacity-0"
            } transition-all ease-in-out duration-300`}
          >
            <SearchBar className="mt-3" iconClassName="top-[24px]" />
          </div>
          {/* Search bar ends here */}

          <i class="fa-regular fa-user text-gray-600 cursor-pointer"></i>
          <i
            class="fa-solid fa-ellipsis-vertical text-gray-600 cursor-pointer"
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              setIsSearchbarOpen(false);
            }}
          ></i>

          {/* Menu is here */}
          <div
            className={` absolute -right-1 -bottom-5 bg-white flex flex-col items-center justify-center w-24 h-9 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            } transition-all ease-in-out duration-200`}
          >
            <p className="cursor-pointer">Delete</p>
          </div>
        </div>
      </div>

      {/* message container */}
      <div className="h-[582px] w-full will-change-scroll p-3 overflow-auto">
        <ReceiverMessage />
        <SenderMessage />
      </div>

      <div className="h-20 px-4 border-l-0 border-r-0 border-b-0 border-t border-gray-300 flex items-center">
        <form className="mt-3">
          <Input
            type="text"
            placeholder="Enter message..."
            id="message"
            name="message"
            ref={messageInput}
            className="p-2 w-[850px] bg-slate-50 border border-gray-300 ml-3 rounded-md pl-2 outline-none"
          />
        </form>
        <div className="flex gap-8 ml-5 p-2">
          <div className="relative group">
            <i class="fa-regular fa-face-smile text-blue-800 cursor-pointer"></i>
            <span className=" invisible opacity-0 absolute rounded-md bottom-10 -right-5 text-sm bg-black text-white px-3 py-2 group-hover:visible group-hover:opacity-100 transition-all ease-in-out duration-300">
              <div className="w-3 h-3 bg-black  absolute left-[25px] -bottom-[5px] rotate-45 rounded-l-sm"></div>
              Emoji
            </span>
          </div>
          <label htmlFor="image" className="relative group">
            <i class="fa-solid fa-image text-blue-800 cursor-pointer"></i>
            <input type="file" id="image" name="image" className=" hidden" />
            <span className=" invisible opacity-0 absolute rounded-md bottom-10 -right-[24px] text-sm bg-black text-white px-3 py-2 group-hover:visible group-hover:opacity-100 transition-all ease-in-out duration-300">
              <div className="w-3 h-3 bg-black  absolute left-[27px] -bottom-[5px] rotate-45 rounded-l-sm"></div>
              Image
            </span>
          </label>
        </div>
        <button className="bg-blue-600 w-9 p-1.5 ml-5 rounded-md">
          <img src={SendMessageImage} alt="Send" />
        </button>
      </div>
    </>
  );
}

export default ChatContainer;
