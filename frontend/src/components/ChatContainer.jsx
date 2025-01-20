import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Input,
  SenderMessage,
  ReceiverMessage,
  SearchBar,
} from "./index.js";
import { SendMessageImage, URL } from "../assets/index.js";
import { useChat } from "../context/ChatContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, addMessage } from "../features/messageSlice.js";
import axios from "axios";
import { toast } from "react-toastify";
import { removeChat, removeGroupChat } from "../features/chatsSlice.js";

function ChatContainer({ setIsOtherProfileOpen }) {
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messageRef = useRef(null);
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState(null);

  const currentUser = useSelector((state) => state.user.userData);

  const { selectedChat, setSelectedChat } = useChat();
  const allMessages = useSelector((state) => state.messages.messages);

  const [chatMessages, setChatMessages] = useState([]);

  const fetchAllMessages = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/v1/messages/${selectedChat._id}`,
        { withCredentials: true }
      );

      dispatch(setMessages(response.data.data));

      setChatMessages(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setChatMessages(allMessages);
  }, [allMessages]);

  useEffect(() => {
    fetchAllMessages();
  }, [dispatch, selectedChat]);

  useEffect(() => {
    if (messageRef?.current) {
      messageRef.current.focus();
    }
  }, []);

  const onMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const onMessageSend = async (e) => {
    e.preventDefault();

    if (!messageInput) {
      toast.error("please enter message");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/api/v1/messages/`,
        { chatId: selectedChat._id, content: messageInput },
        { withCredentials: true }
      );

      dispatch(addMessage(response.data.data));

      setChatMessages((prevChatMessages) => [
        ...prevChatMessages,
        response.data.data,
      ]);
      setSelectedChat((prev) => ({
        ...prev,
        latestMessage: response.data.data,
      }));
      setMessageInput("");
    } catch (error) {
      console.log(error);
    }
  };

  // chat delete function
  const onChatDelete = async () => {
    try {
      const response = await axios.delete(
        `${URL}/api/v1/chats/${selectedChat._id}`,
        { withCredentials: true }
      );

      if (response.data.statusCode < 400) {
        if (selectedChat.isGroupChat) {
          dispatch(removeGroupChat(response.data.data._id));
        } else {
          dispatch(removeChat(response.data.data._id));
        }
        setSelectedChat(null);
        setIsOtherProfileOpen(false);
        toast.success("Chat deleted successfully");
      }
    } catch (error) {
      console.log("Chat deletion error: ", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="border-b border-l-0 border-r-0 border-t-0 border-gray-300 h-20 flex justify-between pr-2 bg-white bg-opacity-50 backdrop-blur-md">
        <div className="flex gap-3 items-center ml-4">
          <Avatar
            avatar={
              selectedChat.isGroupChat
                ? selectedChat.groupProfile
                : selectedChat.users[0].avatar
            }
          />
          <h1 className="font-semibold">
            {selectedChat.isGroupChat
              ? selectedChat.chatName
              : selectedChat.users[0].fullname}
          </h1>
        </div>
        <div className="flex gap-8 items-center mr-5 relative drop-shadow-md">
          <i
            class="fa-solid fa-magnifying-glass text-gray-600 cursor-pointer p-1"
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
            <SearchBar
              className="mt-3"
              iconClassName="top-[24px]"
              placeholder="Search messages or users"
            />
          </div>
          {/* Search bar ends here */}

          <i
            className="fa-regular fa-user text-gray-600 cursor-pointer p-1"
            onClick={() => {
              setIsOtherProfileOpen(true);
            }}
          ></i>

          <i
            class="fa-solid fa-ellipsis-vertical z-50 text-gray-600 cursor-pointer"
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
            <p className="cursor-pointer" onClick={onChatDelete}>
              Delete
            </p>
          </div>
        </div>
      </div>

      {/* message container */}
      <div className="h-[582px] w-full will-change-scroll p-3 overflow-auto">
        {chatMessages.map((message) => {
          return message.sender._id === currentUser._id ? (
            <div className="flex flex-col -mb-4">
              <SenderMessage
                avatar={message.sender.avatar}
                content={message.content}
                date={message.createdAt}
              />
            </div>
          ) : (
            <ReceiverMessage
              avatar={message.sender.avatar}
              content={message.content}
              date={message.createdAt}
            />
          );
        })}
      </div>

      {/* message input */}
      <div className="h-20 px-4 border-l-0 border-r-0 border-b-0 border-t w-full border-gray-300 grid grid-cols-[50fr_1fr_1fr_1fr] gap-2 items-center">
        <form className="mt-3" onSubmit={onMessageSend}>
          <Input
            type="text"
            placeholder="Enter message..."
            id="message"
            name="message"
            ref={messageRef}
            value={messageInput}
            onChange={onMessageChange}
            className="p-2 w-full bg-slate-50 border border-gray-300 ml-3 rounded-md pl-2 outline-none"
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
        <button
          className="bg-blue-600 w-9 p-1.5 ml-5 rounded-md"
          onClick={onMessageSend}
        >
          <img src={SendMessageImage} alt="Send" />
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
