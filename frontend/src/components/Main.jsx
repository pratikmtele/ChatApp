import React, { useState } from "react";
import { ChatContainer, NoChatSelected } from "./index.js";

function Main() {
  const [selectedUser, setSelectedUser] = useState("");
  return (
    <div className="min-h-screen bg-slate-50 translate-x-96 w-[1056px] flex flex-col justify-between">
      {selectedUser !== null ? <ChatContainer /> : <NoChatSelected />}
    </div>
  );
}

export default Main;
