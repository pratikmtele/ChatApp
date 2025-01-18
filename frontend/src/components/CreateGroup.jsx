import React, { useState, useEffect } from "react";
import { useChat } from "../context/ChatContext.jsx";
import { Button, Input, Modal, SearchBar, UserItem } from "./index.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { URL as APIURL } from "../assets/index.js";
import { Avatar } from "../assets/index.js";
import { toast } from "react-toastify";
import { addGroupChat } from "../features/chatsSlice.js";

const CreateGroup = ({ isOpen, setIsOpen, setGroupChats }) => {
  const [groupName, setGroupName] = useState("");
  const [profile, setProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(Avatar);
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [pending, setPending] = useState(false);

  const dispatch = useDispatch();

  const { _, setSelectedChat } = useChat();

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${APIURL}/api/v1/users/`, {
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

  const onChange = (e) => {
    setSearchUser(e.target.value);
  };

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

  // select user
  const handleUserSelect = (user) => {
    if (selectedUsers.includes(user._id)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user._id]);
    }
  };

  // clearing the inputed data from the modal when isOpen is false
  useEffect(() => {
    if (!isOpen) {
      setGroupName("");
      setSelectedUsers([]);
      setSearchUser("");
      setPreviewImage(Avatar);
    }
  }, [isOpen]);

  const onProfileChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    // Create a preview URL for the selected image
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  const onGroupCreate = async () => {
    if (groupName.trim() === "") {
      toast.error("Group name is required");
      return;
    } else if (groupName.length < 5) {
      toast.error("Group name must be at least 5 characters long");
      return;
    }
    if (selectedUsers.length <= 0) {
      toast.error("Please select at least two users to create a group");
      return;
    }
    setIsAvatarUploading(true);
    setPending(true);

    const formData = new FormData();
    formData.set("groupName", groupName);
    formData.set("users", selectedUsers);
    formData.set("profile", profile);

    try {
      const response = await axios.post(
        `${APIURL}/api/v1/chats/group`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.statusCode < 400) {
        dispatch(addGroupChat(response.data.data));
        setGroupChats((prev) => [...prev, response.data.data]);
        setSelectedChat(response.data.data);
        toast.success("Group created successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      setIsAvatarUploading(false);
      setPending(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={
          <div className="w-full relative">
            <p className="text-2xl font-bold text-blue-700">Create New Group</p>
            <div className="absolute -right-8 -top-8 w-[73px] h-[73px] bg-blue-700 rounded-full flex items-center justify-evenly">
              <i
                className="fa-solid fa-xmark text-xl text-white cursor-pointer"
                onClick={() => setIsOpen(false)}
              ></i>
            </div>
          </div>
        }
        footer={
          <div>
            <Button
              className="gradient-color text-white font-semibold py-2 rounded-md px-3 float-right"
              label="Create Group"
              pending={pending}
              onClick={onGroupCreate}
            />
          </div>
        }
      >
        <div className="w-full">
          <div className="w-24 h-24 rounded-full relative m-auto">
            <img
              src={previewImage}
              className=" w-full h-full rounded-full object-cover"
            />
            <label
              htmlFor="profile-image"
              className={`absolute right-0 bottom-2 bg-slate-300 w-6 h-6 flex justify-center items-center rounded-full hover:scale-105 cursor-pointer ${
                isAvatarUploading ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <i className="fa-solid fa-camera text-sm text-black "></i>
              <input
                type="file"
                id="profile-image"
                className="hidden"
                disabled={isAvatarUploading}
                onChange={onProfileChange}
              />
            </label>
          </div>
          <div>
            <Input
              type="text"
              id="groupName"
              name="groupName"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="border border-gray-300 h-10 pl-2 mt-5 rounded-md outline-none hover:border-black transition-all ease-in-out duration-200"
            />
          </div>
          <SearchBar
            placeholder="Search"
            className="bottom-10 right-0 mt-5 "
            iconClassName="bottom-6"
            value={searchUser}
            onChange={onChange}
          />
          <div
            id="users-container"
            className="max-h-80 min-h-[300px] border border-slate-300 mt-2 rounded-md flex flex-col gap-2 p-2 will-change-auto overflow-scroll hide-scrollbar"
          >
            {users.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                isSelected={selectedUsers.includes(user._id)}
                onClick={() => handleUserSelect(user)}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateGroup;
