import React, { useEffect, useState } from "react";
import { Avatar, InfoImage, URL } from "../assets";
import { Input, SideContainer } from "../components/index.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { updateAccountDetails, updateAvatar } from "../features/userSlice.js";

function Profile({ isOpen }) {
  const initalUserData = useSelector((state) => state.user.userData);
  const [userData, setUserData] = useState(initalUserData);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [isDetailsEditable, setIsDetailsEditable] = useState(false);
  const dispatch = useDispatch();

  const onImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.set("avatar", file);
    setIsAvatarUploading(true);

    try {
      const response = await axios.patch(
        `${URL}/api/v1/users/update-avatar`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(updateAvatar(response.data.data));
      setUserData((prev) => ({ ...prev, avatar: response.data.data.avatar }));
      toast.success("Avatar updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsAvatarUploading(false);
    }
  };

  const onDetalsChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateData = (formData) => {
    if (
      !formData.fullname ||
      !formData.username ||
      !formData.email ||
      !formData.bio
    ) {
      return "All fields are required";
    } else if (formData.fullname.length < 3) {
      return "Full name should be at least 3 characters long";
    } else if (formData.username.length < 3) {
      return "Username should be at least 3 chatacters long";
    } else if (formData.bio.length < 3) {
      return "About should be at least 10 characters long";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Email address is not valid";
    } else if (formData.bio.length > 200) {
      return "About should be at most 200 characters long";
    }
  };

  const onDetailsSave = () => {
    const errorData = validateData(userData);
    if (errorData) {
      toast.error(errorData);
      return;
    }

    axios
      .patch(`${URL}/api/v1/users/update-account-details`, userData, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(updateAccountDetails(res.data.data));
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setIsDetailsEditable(false));
  };

  return (
    <SideContainer isOpen={isOpen}>
      <div className={`flex flex-col items-center`}>
        <h1 className="font-bold mt-2 mb-2 text-xl">Profile</h1>
        <p className="mb-4">Your Profile Information</p>
        <div className="w-28 h-28 rounded-full relative">
          <img
            src={userData?.avatar ? userData.avatar : Avatar}
            className=" w-full h-full rounded-full object-cover"
          />
          <label
            htmlFor="avatar-upload"
            className={`absolute right-0 bottom-3 bg-slate-100 w-7 h-7 flex justify-center items-center rounded-full hover:scale-105 cursor-pointer ${
              isAvatarUploading ? "animate-pulse pointer-events-none" : ""
            }`}
          >
            <i class="fa-solid fa-camera text-md text-black "></i>
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              disabled={isAvatarUploading}
              onChange={onImageChange}
            />
          </label>
        </div>
        <div className="h-6">
          {isAvatarUploading ? (
            <p className="mt-2">
              <i class="fa-solid fa-spinner fa-spin-pulse mr-1"></i>
              Uploading...
            </p>
          ) : null}
        </div>
        <div className="w-full p-3 mt-5 rounded-md relative">
          {isDetailsEditable ? (
            <i
              class="fa-regular fa-floppy-disk text-xl relative left-[320px] cursor-pointer"
              onClick={onDetailsSave}
            ></i>
          ) : (
            <i
              class="fa-regular fa-pen-to-square relative left-[320px] text-xl cursor-pointer"
              onClick={() => setIsDetailsEditable(true)}
            ></i>
          )}

          <div>
            <h2 className="text-md text-gray-600 text-sm mb-1">
              <i class="fa-regular fa-user text-sm mr-2"></i>Full Name
            </h2>
            <Input
              type="text"
              value={userData?.fullname}
              placeholder="Full Name"
              name="fullname"
              id="fullname"
              onChange={onDetalsChange}
              disabled={!isDetailsEditable}
              className={`w-full h-9 border-b bg-white outline-none ${
                isDetailsEditable ? "border-gray-400" : "border-gray-50"
              }`}
            />
          </div>
          <div>
            <h2 className="text-md text-gray-600 text-sm mb-1">
              <i class="fa-regular fa-user text-sm mr-2"></i>Username
            </h2>
            <Input
              type="text"
              value={userData?.username}
              placeholder="username"
              name="username"
              id="username"
              onChange={onDetalsChange}
              disabled={!isDetailsEditable}
              className={`w-full h-9 border-b bg-white outline-none ${
                isDetailsEditable ? "border-gray-400" : "border-gray-50"
              }`}
            />
          </div>
          <div>
            <h2 className="text-md text-gray-600 text-sm mb-1">
              <i class="fa-regular fa-envelope mr-2"></i>Email Address
            </h2>
            <Input
              type="text"
              value={userData?.email}
              placeholder="Email Address"
              name="email"
              id="email"
              onChange={onDetalsChange}
              disabled={!isDetailsEditable}
              className={`w-full h-9 border-b bg-white outline-none ${
                isDetailsEditable ? "border-gray-400" : "border-gray-50"
              }`}
            />
          </div>
          <div>
            <h2 className="text-md text-gray-600 text-sm mb-1 flex items-center">
              <img src={InfoImage} className="w-4 h-4 inline-block mr-2" />
              About
            </h2>
            <textarea
              type="text"
              value={userData?.bio ? userData.bio : ""}
              placeholder="Write something about you"
              name="bio"
              id="bio"
              maxLength={200}
              onChange={onDetalsChange}
              disabled={!isDetailsEditable}
              className={`w-full h-9 border-b bg-white outline-none ${
                isDetailsEditable
                  ? "border-gray-400 min-h-7"
                  : " resize-none border-gray-50"
              }`}
            />
          </div>
        </div>
      </div>
    </SideContainer>
  );
}

export default Profile;
