import React from "react";
import { Logo, URL } from "../assets/index.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice.js";

function Navigation({ setIsProfileOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    axios
      .get(`${URL}/api/v1/users/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(logout());
        toast.success(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="gradient-color to-100% text-white h-14 flex items-center justify-between">
      <div id="logo" className="ml-5 flex gap-3 items-center">
        <img src={Logo} className="w-8 " />
        <h5 className="text-xl font-semibold">Talkify</h5>
      </div>
      <ul className="mr-5 flex gap-6">
        <li className="cursor-pointer">
          <i class="fa-solid fa-gear mr-2"></i>Settings
        </li>
        <li
          onClick={() => setIsProfileOpen((prev) => !prev)}
          className=" cursor-pointer"
        >
          <i class="fa-regular fa-user mr-2"></i>
          Profile
        </li>
        <li className=" cursor-pointer" onClick={onLogout}>
          <i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>Logout
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
