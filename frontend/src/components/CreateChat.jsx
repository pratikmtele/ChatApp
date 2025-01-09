import React, { useEffect, useState } from "react";
import { Modal, SearchBar, UserItem } from "./index.js";
import axios from "axios";
import { URL } from "../assets/index.js";

function CreateChat({ isOpen, setIsOpen }) {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${URL}/api/v1/users/`, {
        withCredentials: true,
      });

      setUsers(response.data.data);
    } catch (error) {
      console.log("Fetching users error: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const searchUserFunction = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/v1/users/search-users?search=${searchUser}`,
        {
          withCredentials: true,
        }
      );
      setUsers(response.data.data);
    } catch (error) {
      fetchAllUsers();
    }
  };

  useEffect(() => {
    if (searchUser === "") {
      fetchAllUsers();
    } else {
      searchUserFunction();
    }
  }, [searchUser]);

  const onChange = (e) => {
    setSearchUser(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={
        <div className="w-full relative">
          <p className="text-2xl font-bold text-blue-700">Create New Message</p>
          <div className="absolute -right-8 -top-8 w-[73px] h-[73px] bg-blue-700 rounded-full flex items-center justify-evenly">
            <i
              class="fa-solid fa-xmark text-xl text-white cursor-pointer"
              onClick={() => setIsOpen(false)}
            ></i>
          </div>
        </div>
      }
    >
      <div className="w-full">
        <SearchBar
          placeholder="Search"
          className="bottom-10 right-0"
          iconClassName="top-3"
          value={searchUser}
          onChange={onChange}
        />
        <div
          id="users-container"
          className="max-h-80 min-h-fit border border-slate-300 mt-2 rounded-md flex flex-col gap-2 p-2 will-change-auto overflow-scroll hide-scrollbar"
        >
          {users.map((user) => (
            <UserItem user={user} />
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default CreateChat;
