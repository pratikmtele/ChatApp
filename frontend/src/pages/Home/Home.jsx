import React, { useEffect, useState } from "react";
import {
  Chats,
  Groups,
  Navigation,
  Profile,
  Main,
} from "../../components/index.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../assets/index.js";

function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(true);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      await axios.get(`${URL}/api/v1/users/current-user`, {
        withCredentials: true,
      });
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

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
