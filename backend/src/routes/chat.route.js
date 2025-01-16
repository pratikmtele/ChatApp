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
} from "../controllers/chat.controller.js";

const chatRouter = express();

chatRouter
  .route("/")
  .post(verifyAccessToken, accessChats)
  .get(verifyAccessToken, fetchChats);

chatRouter.route("/:chatId").delete(verifyAccessToken, removeChat);

chatRouter.route("/group").post(verifyAccessToken, createGroupChat);
chatRouter.route("/rename").patch(verifyAccessToken, renameGroup);
chatRouter.route("/groupadd").patch(verifyAccessToken, addToGroup);
chatRouter.route("/groupremove").patch(verifyAccessToken, removeFromGroup);

export default chatRouter;
