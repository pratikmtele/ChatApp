import React, { useEffect, useState } from "react";
import { Navigation, Profile } from "../../components/index.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navigation setIsProfileOpen={setIsProfileOpen} />
      <Profile isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
    </div>
  );
}

export default Home;
