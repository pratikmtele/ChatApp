import React from "react";
import { ChatItem, SearchBar, SideContainer } from "./index.js";

function Chats({ isChatsOpen }) {
  return (
    <SideContainer isOpen={isChatsOpen}>
      <h1 className="font-bold text-xl mt-5">Chats</h1>
      <SearchBar />
      <p className=" font-semibold my-4">Recent</p>
      <div className="will-change-scroll max-h-[556px] overflow-y-auto hide-scrollbar">
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
    </SideContainer>
  );
}

export default Chats;
