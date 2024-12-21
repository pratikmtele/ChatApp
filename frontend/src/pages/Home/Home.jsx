import React, { useEffect, useState } from "react";
import { Chats, Groups, Navigation, Profile } from "../../components/index.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(true);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex">
      <Navigation
        setIsProfileOpen={setIsProfileOpen}
        setIsChatsOpen={setIsChatsOpen}
        setIsGroupsOpen={setIsGroupsOpen}
      />
      <Profile isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
      <Chats isChatsOpen={isChatsOpen} />
      <Groups isGroupOpen={isGroupsOpen} />
    </div>
  );
}

export default Home;
