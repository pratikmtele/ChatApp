import React from "react";
import { Modal, SearchBar } from "./index.js";

function CreateChat({ isOpen, setIsOpen }) {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={
        <p className="text-2xl font-bold text-blue-700">Create New Message</p>
      }
      footer={
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="font-bold bg-slate-300 px-4 py-2 rounded"
          >
            Ok
          </button>
        </div>
      }
    >
      <div className="w-full">
        <SearchBar
          placeholder="Search"
          className="bottom-10 right-0"
          iconClassName="top-[14px]"
        />
      </div>
    </Modal>
  );
}

export default CreateChat;
