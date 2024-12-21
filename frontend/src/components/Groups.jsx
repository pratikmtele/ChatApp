import React from "react";
import { SideContainer, SearchBar, ChatItem } from "./index.js";

function Groups({ isGroupOpen }) {
  return (
    <SideContainer isOpen={isGroupOpen}>
      <h1 className="font-bold text-xl mt-5">Groups</h1>
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

export default Groups;
