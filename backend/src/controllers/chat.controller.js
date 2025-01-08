import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

const accessChats = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) throw new ApiError(400, "UserId param not sent with request");

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "fullname email avatar",
  });

  if (isChat.length > 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, isChat, "Chat send successfully."));
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      return res
        .status(200)
        .json(new ApiResponse(200, fullChat, "Chat send successfully."));
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

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name)
    throw new ApiError(400, "All fields are required");

  const users = JSON.parse(req.body.users);

  if (users.length < 2)
    throw new ApiError(
      400,
      "2 or more users are required to form a group chat"
    );

  try {
    const chatGroup = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findOne({ _id: chatGroup._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res
      .status(200)
      .json(
        new ApiResponse(200, fullGroupChat, "Group chat created successfully")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Something went wrong while creating group chat");
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
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
