import React, { useEffect, useState } from "react";
import { SideContainer, SearchBar, ChatItem, CreateGroup } from "./index.js";
import axios from "axios";
import { setGroupChat } from "../features/chatsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../assets/index.js";

function Groups({ isGroupOpen }) {
  const reduxGroupChats = useSelector((state) => state.chats.groupChats);
  const [groupChats, setGroupChats] = useState([]);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setGroupChats(reduxGroupChats);
  }, [reduxGroupChats]);

  const fetchAllGroupChats = async () => {
    try {
      const response = await axios(`${URL}/api/v1/chats/group-chats`, {
        withCredentials: true,
      });

      if (response.data.statusCode < 400) {
        dispatch(setGroupChat(response.data.data));
        setGroupChats(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllGroupChats();
  }, []);

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
            <ChatItem
              avatar={groupChat.groupProfile}
              latestMessage={groupChat?.latestMessage?.content}
              fullname={groupChat.chatName}
            />
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
