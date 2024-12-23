import React, { useState } from "react";
import { ChatItem, SearchBar, SideContainer } from "./index.js";

function Chats({ isChatsOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SideContainer isOpen={isChatsOpen}>
      <div onClick={() => setIsMenuOpen(false)}>
        <h1 className="font-bold text-xl mt-5">Chats</h1>
        <SearchBar />
        <p className=" font-semibold my-4">Recent</p>
        <div className="will-change-scroll max-h-[556px] overflow-y-auto hide-scrollbar bottom-0 relative">
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </div>
        <div
          className="bg-blue-600 drop-shadow-md fixed flex items-center justify-center text-white w-12 h-12 rounded-full bottom-10 left-[310px] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
        >
          <i class="fa-solid fa-plus text-xl"></i>
        </div>

        {/* action menu */}
        {isMenuOpen ? (
          <div
            className={`absolute bottom-24 right-2 p-2 bg-white w-40 h-32 z-50 border flex flex-col justify-center drop-shadow-lg`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-5 justify-end gap-4 mr-1 cursor-pointer">
              <p className="font-semibold text-right">New Chat</p>
              <i class="fa-solid fa-message w-8 h-8 text-center content-center text-blue-800 text-sm bg-blue-300 rounded-full"></i>
            </div>
            <div className="flex justify-end gap-4 mr-1 cursor-pointer">
              <p className="font-semibold">New Group</p>
              <i class="fa-solid fa-user-group w-8 h-8 text-center content-center text-blue-800 text-sm bg-blue-300 rounded-full"></i>
            </div>
          </div>
        ) : null}
      </div>
    </SideContainer>
  );
}

export default Chats;
