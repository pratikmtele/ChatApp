import React from "react";
import { Logo } from "../assets/index.js";

function NoChatSelected() {
  return (
    <div className="flex flex-col justify-center items-center min-h-svh">
      <img src={Logo} alt="Logo" className="w-12" />
      <h1 className="font-semibold text-2xl mt-3">Welcome to Talkify</h1>
    </div>
  );
}

export default NoChatSelected;
