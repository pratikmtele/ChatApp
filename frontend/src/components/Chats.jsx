import React, { useEffect, useState } from "react";
import { ChatItem, SearchBar, SideContainer, CreateChat } from "./index.js";
import { useChat } from "../context/ChatContext.jsx";
import useChatStore from "../store/useChatStore.jsx";

function Chats({ isChatsOpen }) {
  const { chats, setChats } = useChatStore();
  const [allChats, setAllChats] = useState(chats);
  const [search, setSearch] = useState("");
  const [searchedChats, setSearchChats] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { selectedChat, setSelectedChat } = useChat();

  useEffect(() => {
    setChats();
  }, []);

  useEffect(() => {
    setAllChats(chats);
  }, [chats, selectedChat]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filteredChats = allChats.filter((chat) =>
      chat.users.some((user) =>
        user.fullname.toLowerCase().includes(search.toLowerCase())
      )
    );
    setSearchChats(filteredChats);
  }, [search, allChats]);

  return (
    <SideContainer isOpen={isChatsOpen}>
      <div>
        <h1 className="font-bold text-xl mt-5">Chats</h1>
        <SearchBar
          className="mt-5"
          iconClassName="top-[32px]"
          value={search}
          onChange={onChange}
          placeholder="Search chats"
        />
        <p className=" font-semibold my-4">Recent</p>
        <div className="will-change-scroll max-h-[556px] overflow-y-auto hide-scrollbar bottom-0 relative">
          {searchedChats.map((chat) => (
            <div onClick={() => setSelectedChat(chat)}>
              <ChatItem
                key={chat._id}
                avatar={chat.users[0].avatar}
                fullname={chat.users[0].fullname}
                latestMessage={chat?.latestMessage?.content}
              />
            </div>
          ))}
        </div>
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

      {/* Chat Modal */}
      <CreateChat
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setAllChats={setAllChats}
      />
    </SideContainer>
  );
}

export default Chats;
