import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  removeChat,
  fetchGroups,
} from "../controllers/chat.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const chatRouter = express();

chatRouter
  .route("/")
  .post(verifyAccessToken, accessChats)
  .get(verifyAccessToken, fetchChats);

chatRouter.route("/:chatId").delete(verifyAccessToken, removeChat);

chatRouter
  .route("/group")
  .post(verifyAccessToken, upload.single("profile"), createGroupChat);
chatRouter.route("/group-chats").get(verifyAccessToken, fetchGroups);
chatRouter.route("/rename").patch(verifyAccessToken, renameGroup);
chatRouter.route("/groupadd").patch(verifyAccessToken, addToGroup);
chatRouter.route("/groupremove").patch(verifyAccessToken, removeFromGroup);

export default chatRouter;
