import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!chatId) {
    return res.status(404).json(ApiResponse(404, {}, "Chat ID is not found"));
  }

  if (!content) {
    return res.status(400).json(ApiResponse(400, {}, "Content is required"));
  }

  const message = {
    sender: req.user._id,
    chatId,
    content,
  };

  try {
    const newMessage = await Message.create(message);

    if (!newMessage) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Message is not sent"));
    }

    await Chat.findByIdAndUpdate(
      { _id: newMessage.chatId },
      {
        $set: {
          latestMessage: newMessage._id,
        },
      }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, newMessage, "Message sent"));
  } catch (error) {
    return res.status(400).json(new ApiResponse(400, {}, error.message));
  }
});

const allMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.body;

  if (!chatId)
    return res.status.json(new ApiResponse(404, {}, "chat id is missing"));

  const allMessages = await Message.find({ chatId: chatId }).populate(
    "sender",
    "avatar fullname username"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, allMessages, "Messages fetched successfully"));
});

export { sendMessage, allMessages };
