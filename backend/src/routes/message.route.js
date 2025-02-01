import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  sendMessage,
  allMessages,
  deleteMessage,
} from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const messageRouter = express();

// secured routes

messageRouter.post("/", verifyAccessToken, upload.single("image"), sendMessage);
messageRouter.route("/:chatId").get(verifyAccessToken, allMessages);
messageRouter
  .route("/delete/:messageId")
  .delete(verifyAccessToken, deleteMessage);

export default messageRouter;
