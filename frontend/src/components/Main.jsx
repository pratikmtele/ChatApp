import React from "react";
import { ChatContainer, NoChatSelected } from "./index.js";
import { useChat } from "../context/ChatContext.jsx";

function Main() {
  const { selectedChat, _ } = useChat();
  return (
    <div className="min-h-screen bg-slate-50 translate-x-96 w-[1056px] flex flex-col justify-between">
      {selectedChat !== null ? <ChatContainer /> : <NoChatSelected />}
    </div>
  );
}

export default Main;
