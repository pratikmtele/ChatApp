import React, { useEffect, useState } from "react";
import { SideContainer, SearchBar, ChatItem, CreateGroup } from "./index.js";
import { useChat } from "../context/ChatContext.jsx";
import useChatStore from "../store/useChatStore.jsx";

function Groups({ isGroupOpen }) {
  const { setGroupChats: fetchAllGroups, groupChats: chats } = useChatStore();
  const [groupChats, setGroupChats] = useState(chats);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedChat, setSelectedChat } = useChat();

  useEffect(() => {
    setGroupChats(chats);
  }, [chats]);

  useEffect(() => {
    fetchAllGroups();
  }, [selectedChat]);

  return (
    <SideContainer isOpen={isGroupOpen}>
      <h1 className="font-bold text-xl mt-5">Groups</h1>
      <SearchBar
        className="mt-5"
        iconClassName="top-[32px]"
        placeholder="Search groups"
      />
      <p className=" font-semibold my-4">Recent</p>
      <div className="will-change-scroll max-h-[556px] overflow-y-auto hide-scrollbar">
        {groupChats.map((groupChat) => {
          return (
            <div onClick={() => setSelectedChat(groupChat)}>
              <ChatItem
                avatar={groupChat.groupProfile}
                latestMessage={groupChat?.latestMessage?.content}
                fullname={groupChat.chatName}
              />
            </div>
          );
        })}
        <div
          className="bg-blue-600 drop-shadow-md fixed flex items-center justify-center text-white w-12 h-12 rounded-full bottom-10 left-[310px] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
        >
          <i class="fa-solid fa-plus text-xl"></i>
        </div>
      </div>
      {/* Group chat modal */}
      <CreateGroup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setGroupChats={setGroupChats}
      />
    </SideContainer>
  );
}

export default Groups;
