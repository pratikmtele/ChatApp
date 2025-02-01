import React, { useEffect, useState } from "react";
import {
  Chats,
  Groups,
  Navigation,
  Profile,
  Main,
} from "../../components/index.js";

function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(true);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);

  return (
    <div className="flex bg-slate-50">
      <Navigation
        setIsProfileOpen={setIsProfileOpen}
        setIsChatsOpen={setIsChatsOpen}
        setIsGroupsOpen={setIsGroupsOpen}
      />
      <Profile isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
      <Chats isChatsOpen={isChatsOpen} />
      <Groups isGroupOpen={isGroupsOpen} />
      <Main />
    </div>
  );
}

export default Home;
