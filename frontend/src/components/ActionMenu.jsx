import React from "react";

function ActionMenu({ setIsOpen, setIsMenuOpen }) {
  return (
    <div
      className={`absolute bottom-24 right-2 p-2 bg-white w-40 h-32 z-50 border flex flex-col justify-center drop-shadow-lg`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center mb-5 justify-end gap-4 mr-1 cursor-pointer">
        <p
          className="font-semibold text-right"
          onClick={() => {
            setIsOpen((prev) => !prev);
            setIsMenuOpen(false);
          }}
        >
          New Chat
        </p>
        <i class="fa-solid fa-message w-8 h-8 text-center content-center text-blue-800 text-sm bg-blue-300 rounded-full"></i>
      </div>
      <div className="flex justify-end gap-4 mr-1 cursor-pointer">
        <p
          className="font-semibold"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          New Group
        </p>
        <i class="fa-solid fa-user-group w-8 h-8 text-center content-center text-blue-800 text-sm bg-blue-300 rounded-full"></i>
      </div>
    </div>
  );
}

export default ActionMenu;
