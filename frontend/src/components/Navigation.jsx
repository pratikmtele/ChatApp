import React from "react";
import { Logo } from "../assets/index.js";
import useAuthStore from "../store/useAuthStore.jsx";

function Navigation({ setIsProfileOpen, setIsChatsOpen, setIsGroupsOpen }) {
  const { logout } = useAuthStore();

  const onLogout = () => {
    logout();
  };

  const navItems = [
    {
      title: "Profile",
      onClick: () => {
        setIsProfileOpen(true);
        setIsChatsOpen(false);
        setIsGroupsOpen(false);
      },
      icon: "fa-user",
    },
    {
      title: "Settings",
      onClick: "",
      icon: "fa-gear",
    },
    {
      title: "Logout",
      onClick: onLogout,
      icon: "fa-arrow-right-from-bracket",
    },
  ];

  const ChatsItems = [
    {
      title: "Chats",
      onClick: () => {
        setIsChatsOpen(true);
        setIsProfileOpen(false);
        setIsGroupsOpen(false);
      },
      icon: "fa-comment",
    },
    {
      title: "Groups",
      onClick: () => {
        setIsGroupsOpen(true);
        setIsChatsOpen(false);
        setIsProfileOpen(false);
      },
      icon: "fa-user-group",
    },
  ];

  return (
    <div className="gradient-color to-100% text-white w-24 z-50 min-h-svh flex flex-col justify-between">
      <div id="logo" className="flex w-full flex-col items-center pt-6">
        <img src={Logo} className="w-8 mb-1" />
        <h5 className="text-xl font-semibold">Talkify</h5>

        <ul className="w-full flex flex-col items-center gap-10 mt-20">
          {ChatsItems.map((item) => {
            return (
              <li
                key={item.title}
                onClick={item.onClick}
                className="relative cursor-pointer group"
              >
                <i class={`fa-solid ${item.icon} text-xl`}></i>
                <span className=" invisible opacity-0 absolute left-10 rounded-md text-sm bg-black text-white px-3 py-1 group-hover:visible group-hover:opacity-100 transition-all ease-in-out duration-300">
                  <div className="w-4 h-3 bg-black rotate-45 absolute -left-1 top-[11px] rounded-r-md"></div>
                  {item.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="w-full flex flex-col items-center gap-10 mb-6">
        {navItems.map((item) => {
          return (
            <li
              key={item.title}
              onClick={item.onClick}
              className="relative cursor-pointer group"
            >
              <i class={`fa-solid ${item.icon} text-xl`}></i>
              <span className=" invisible opacity-0 absolute left-9 rounded-md text-sm bg-black text-white px-3 py-1 group-hover:visible group-hover:opacity-100 transition-all ease-in-out duration-300">
                <div className="w-4 h-3 bg-black rotate-45 absolute -left-1 top-[11px] rounded-r-md"></div>
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Navigation;
