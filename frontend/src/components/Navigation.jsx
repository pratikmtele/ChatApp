import React from "react";
import { Logo } from "../assets/index.js";

function Navigation() {
  return (
    <div className="gradient-color to-100% text-white h-14 flex items-center justify-between">
      <div id="logo" className="ml-5 flex gap-3 items-center">
        <img src={Logo} className="w-8 " />
        <h5 className="text-xl font-semibold">Talkify</h5>
      </div>
      <ul className="mr-5 flex gap-6">
        <li>
          <a href="#">
            <i class="fa-solid fa-gear mr-1"></i>Settings
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-regular fa-user mr-2"></i>Profile
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
