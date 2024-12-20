import React, { useState } from "react";
import { Avatar, InfoImage } from "../assets";
import { Input } from "../components/index.js";

function Profile({ isOpen, setIsOpen }) {
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [isDetailsEditable, setIsDetailsEditable] = useState(false);
  const onImageChange = (e) => {};
  const onDetailsSave = (e) => {
    setIsDetailsEditable(false);
  };
  return isOpen ? (
    <div className="bg-white z-50 border rounded-md border-black w-[400px] flex flex-col items-center p-2 absolute right-2 mt-1">
      <i
        class="fa-solid fa-xmark absolute right-2 text-xl top-0 cursor-pointer"
        onClick={() => setIsOpen(false)}
      ></i>
      <h1 className="font-bold mt-2 mb-2 text-xl">Profile</h1>
      <p className="mb-4">Your Profile Information</p>
      <div className="w-28 rounded-full border border-black p-1 relative">
        <img src={Avatar} alt="Avatar" className="" />
        <label
          htmlFor="avatar-upload"
          className={`absolute right-0 bottom-3 hover:scale-105 cursor-pointer ${
            isAvatarUploading ? "animate-pulse pointer-events-none" : ""
          }`}
        >
          <i class="fa-solid fa-camera text-xl"></i>
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
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
      <div className="w-full p-3 mt-4 bg-gray-50 rounded-md relative">
        {isDetailsEditable ? (
          <i
            class="fa-regular fa-floppy-disk text-xl relative left-[340px] cursor-pointer"
            onClick={onDetailsSave}
          ></i>
        ) : (
          <i
            class="fa-regular fa-pen-to-square relative left-[340px] text-xl cursor-pointer"
            onClick={() => setIsDetailsEditable(true)}
          ></i>
        )}

        <div>
          <h2 className="text-md text-gray-600 text-sm mb-1">
            <i class="fa-regular fa-user text-sm mr-2"></i>Full Name
          </h2>
          <Input
            type="text"
            value="Pratik Tele"
            placeholder="Full Name"
            name="fullname"
            id="fullname"
            error=""
            disabled={!isDetailsEditable}
            className={`w-full h-8 border-b outline-none bg-gray-50 ${
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
            value="Pratik123"
            placeholder="username"
            name="username"
            id="username"
            error=""
            disabled={!isDetailsEditable}
            className={`w-full h-8 border-b bg-gray-50 outline-none ${
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
            value="pratiktele4@gmail.com"
            placeholder="Email Address"
            name="email"
            id="email"
            error=""
            disabled={!isDetailsEditable}
            className={`w-full h-8 border-b bg-gray-50 outline-none ${
              isDetailsEditable ? "border-gray-400" : "border-gray-50"
            }`}
          />
        </div>
        <div>
          <h2 className="text-md text-gray-600 text-sm mb-1 flex items-center">
            <img src={InfoImage} className="w-4 h-4 inline-block mr-2" />
            Bio
          </h2>
          <textarea
            type="text"
            value="Pratik123"
            placeholder="Bio"
            name="bio"
            id="bio"
            maxLength={200}
            error=""
            disabled={!isDetailsEditable}
            className={`w-full h-8 border-b bg-gray-50 outline-none ${
              isDetailsEditable
                ? "border-gray-400 min-h-7"
                : " resize-none border-gray-50"
            }`}
          />
        </div>
      </div>
    </div>
  ) : null;
}

export default Profile;
