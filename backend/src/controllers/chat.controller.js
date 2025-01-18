import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const accessChats = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) throw new ApiError(400, "UserId is not sent with request");

  var isChat = await Chat.findOne({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate({
      path: "users",
      select: "-password",
      match: { _id: { $ne: req.user._id } },
    })
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "fullname email avatar",
  });

  if (isChat) {
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          isChat,
          "You are already connected with this user."
        )
      );
  } else {
    let chatData = {
      chatName: "Personal",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate({
        path: "users",
        select: "-password",
        match: { _id: { $ne: req.user._id } },
      });

      return res
        .status(200)
        .json(new ApiResponse(200, fullChat, "Chat created successfully."));
    } catch (errors) {
      console.log(errors);
      throw new ApiError(
        400,
        "Something went wrong while accessing chats",
        errors
      );
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
      isGroupChat: false,
    })
      .populate({
        path: "users",
        select: "-password",
        match: { _id: { $ne: req.user._id } },
      })
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "fullname avatar email",
        });

        return res
          .status(200)
          .json(
            new ApiResponse(200, results, "All chats fetched successfully")
          );
      });
  } catch (error) {
    console.log(error);

    throw new ApiError(
      400,
      "Something went wrong while fetching all the chats"
    );
  }
});

const removeChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  if (!chatId)
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Chat Id is not sent with the reponse"));

  const deletedChat = await Chat.findByIdAndDelete(chatId, { new: true });

  if (!deletedChat)
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Chat is not deleted"));

  return res
    .status(200)
    .json(new ApiResponse(200, deletedChat, "Chat deleted successfully"));
});

// group chat controllers
const createGroupChat = asyncHandler(async (req, res) => {
  const { groupName } = req.body;

  if (!groupName) throw new ApiError(400, "Group name is required");

  if (!req.body.users) throw new ApiError(400, "Users are not selected");

  // Split the users string into an array if it's a string
  const users =
    typeof req.body.users === "string"
      ? req.body.users.split(",")
      : req.body.users;

  if (!users.includes(req.user._id)) {
    users.push(req.user._id);
  }

  const profileLocalPath = req.file?.path;

  if (!profileLocalPath) throw new ApiError(400, "profile file is missing");

  const profile = await uploadOnCloudinary(
    profileLocalPath,
    "ChatApp/chatProfile"
  );

  if (!profile.url)
    throw new ApiError(401, "Avatar is not uplaoded on the cloudinary.");

  if (users.length < 2)
    throw new ApiError(
      400,
      "2 or more users are required to form a group chat"
    );

  try {
    const chatGroup = await Chat.create({
      chatName: groupName,
      users: users,
      groupProfile: profile.url,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findOne({ _id: chatGroup._id })
      .populate({
        path: "users",
        select: "-password",
        match: { _id: { $ne: req.user._id } },
      })
      .populate("groupAdmin", "-password");

    return res
      .status(200)
      .json(
        new ApiResponse(200, fullGroupChat, "Group chat created successfully")
      );
  } catch (error) {
    console.log(error);

    if (profile.url) {
      await deleteFromCloudinary(avatar.public_id);
    }

    throw new ApiError(400, "Something went wrong while creating group chat");
  }
});

const fetchGroups = asyncHandler(async (req, res) => {
  try {
    await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
      isGroupChat: true,
    })
      .populate({
        path: "users",
        select: "-password",
        match: { _id: { $ne: req.user._id } },
      })
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "fullname avatar email",
        });

        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              results,
              "All group chats fetched successfully"
            )
          );
      });
  } catch (error) {
    throw new ApiError(
      400,
      "Something went wrong while fetching all the group chats"
    );
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  if (!chatName) throw new ApiError(404, "Chat name is missing");

  const updatedChat = await Chat.findByIdAndUpdate(
    { _id: chatId },
    {
      $set: {
        chatName,
      },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedChat, "Group chat updated successfully"));
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const updatedGroup = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedGroup, "User added successfully"));
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!userId) throw new ApiError(404, "User id is missing");

  const updatedGroup = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedGroup, "User removed from group successfully")
    );
});

export {
  accessChats,
  fetchChats,
  removeChat,
  createGroupChat,
  fetchGroups,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
