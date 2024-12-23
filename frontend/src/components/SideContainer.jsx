import React from "react";

function SideContainer({ children, isOpen }) {
  return (
    <div
      className={`w-96 border min-h-svh bg-white border-r border-t-0 border-l-0 border-b-0 border-gray-400 px-2 pt-2 absolute ${
        isOpen ? "translate-x-24 opacity-100" : "-translate-x-[800px]"
      } transition-all ease-in-out duration-500`}
    >
      {children}
    </div>
  );
}

export default SideContainer;
