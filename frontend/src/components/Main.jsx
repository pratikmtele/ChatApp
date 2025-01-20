import React, { useState } from "react";
import { ChatContainer, NoChatSelected, OtherProfile } from "./index.js";
import { useChat } from "../context/ChatContext.jsx";

function Main() {
  const { selectedChat, _ } = useChat();
  const [isOtherProfileOpen, setIsOtherProfileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 translate-x-96 w-[1055px] flex">
      {selectedChat !== null ? (
        <ChatContainer setIsOtherProfileOpen={setIsOtherProfileOpen} />
      ) : (
        <NoChatSelected />
      )}
      <div className="flex-1 bg-white border-l border-r-0 border-t-0 border-b-0 border-slate-200">
        {selectedChat ? (
          <OtherProfile
            isOtherProfileOpen={isOtherProfileOpen}
            setIsOtherProfileOpen={setIsOtherProfileOpen}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Main;
