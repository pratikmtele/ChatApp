import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";
import ApiError from "../utils/ApiError.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;

  const imageLocalPath = req.file?.path;

  if (!chatId) throw new ApiError(404, "Chat Id is required");

  let image = null;
  if (imageLocalPath) {
    image = await uploadOnCloudinary(imageLocalPath, "ChatApp/images");

    if (!image.url)
      throw new ApiError(401, "Avatar is not uplaoded on the cloudinary.");
  }

  const message = {
    sender: req.user._id,
    chatId,
    content: content ? content : null,
    fileUrl: image?.url ? image?.url : null,
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

    const createdMessage = await Message.findOne({
      _id: newMessage._id,
    }).populate("sender", "avatar fullname username");

    return res
      .status(200)
      .json(new ApiResponse(200, createdMessage, "Message sent"));
  } catch (error) {
    console.log(error);
    if (image.url) {
      await deleteFromCloudinary(image.public_id);
    }
    return res.status(400).json(new ApiResponse(400, {}, error.message));
  }
});

const allMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

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

const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  if (!messageId)
    throw new ApiError(404, "Message Id is not sent with the request");

  const deletedMessage = await Message.findByIdAndDelete(
    { _id: messageId },
    { new: true }
  );

  if (!deletedMessage)
    throw new ApiError(400, "Message is not deletion failed");

  return res
    .status(200)
    .json(new ApiResponse(200, deletedMessage, "Message deleted successfully"));
});

export { sendMessage, allMessages, deleteMessage };
