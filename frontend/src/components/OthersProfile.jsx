import React from "react";
import { Avatar } from "../assets/index.js";
import { useChat } from "../context/ChatContext.jsx";
import { ChatItem } from "./index.js";

const OthersProfile = ({ isOtherProfileOpen, setIsOtherProfileOpen }) => {
  const { selectedChat } = useChat();
  return (
    <div
      className={`${
        isOtherProfileOpen ? "w-[400px] opacity-100" : "hidden opacity-0"
      } transition-all ease-in-out duration-200 `}
    >
      <i
        class={`${
          isOtherProfileOpen ? "" : "hidden"
        }fa-solid fa-xmark float-right mr-7 mt-5 text-xl cursor-pointer`}
        onClick={() => setIsOtherProfileOpen(false)}
      ></i>

      {/* Profile Pic */}
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={
            selectedChat?.isGroupChat
              ? selectedChat.groupProfile
                ? selectedChat.groupProfile
                : Avatar
              : selectedChat.users[0].avatar
              ? selectedChat.users[0].avatar
              : Avatar
          }
          alt={
            selectedChat?.isGroupChat
              ? selectedChat.chatName
              : selectedChat.users[0].fullname
          }
          className="w-28 h-28 rounded-full object-cover"
        />
      </div>

      {/* User info */}
      <div className="w-full">
        <h1 className="text-center mt-5 font-semibold">
          {selectedChat?.isGroupChat
            ? selectedChat.chatName
            : selectedChat.users[0].fullname}
        </h1>
        <div className="flex justify-center items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full mt-3"></div>
          <p className="font-light text-black text-center mt-3">Active</p>
        </div>

        <div className="w-full h-[1.5px] bg-slate-200 my-5"></div>

        {/* about */}
        <div className="px-5 text-sm">{selectedChat.users[0].bio}</div>

        {selectedChat.users[0].bio ? (
          <div className="w-full h-[1.5px] bg-slate-200 my-5"></div>
        ) : null}

        <div className="ml-5 mt-2 text-sm">
          <p className="text-black font-semibold">Name:</p>
          <p className="mt-1">
            {selectedChat?.isGroupChat
              ? selectedChat.chatName
              : selectedChat.users[0].fullname}
          </p>

          {!selectedChat?.isGroupChat ? (
            <>
              <p className="text-black font-semibold mt-3">Email:</p>
              <p className="mt-1">{selectedChat.users[0].email}</p>
            </>
          ) : (
            <div className="mt-5 pr-5">
              <h1 className="font-semibold">Members</h1>
              <div className="border border-slate-300 flex flex-col gap-2 rounded-md mt-3 h-[300px] overflow-auto will-change-auto hide-scrollbar">
                <ChatItem
                  avatar={selectedChat.groupAdmin.avatar}
                  fullname={selectedChat.groupAdmin.fullname}
                  latestMessage={"Admin"}
                />
                {selectedChat.users.map((user) => (
                  <ChatItem
                    avatar={user.avatar}
                    fullname={user.fullname}
                    key={user._id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OthersProfile;
