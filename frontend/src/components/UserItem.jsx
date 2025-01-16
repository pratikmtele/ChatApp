import React from "react";
import { Avatar } from "./index.js";

function UserItem({ user, onClick }) {
  return (
    <div
      className="w-full min-h-[64px] rounded-md p-1 flex items-center gap-4 cursor-pointer border border-slate-300 hover:border-black transition-all ease-in-out duration-300"
      onClick={onClick}
    >
      <Avatar avatar={user.avatar} />
      <div>
        <h2 className="font-bold">{user.fullname}</h2>
      </div>
    </div>
  );
}

export default UserItem;
