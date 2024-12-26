import React, { useState } from "react";
import { ChatItem, SearchBar, SideContainer, ActionMenu } from "./index.js";

function Chats({ isChatsOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SideContainer isOpen={isChatsOpen}>
      <div onClick={() => setIsMenuOpen(false)}>
        <h1 className="font-bold text-xl mt-5">Chats</h1>
        <SearchBar className="mt-5" iconClassName="top-[32px]" />
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
        {isMenuOpen ? <ActionMenu /> : null}
      </div>
    </SideContainer>
  );
}

export default Chats;
