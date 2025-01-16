import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import { sendMessage, allMessages } from "../controllers/message.controller.js";

const messageRouter = express();

// secured routes

messageRouter.route("/").post(verifyAccessToken, sendMessage);
messageRouter.route("/:chatId").get(verifyAccessToken, allMessages);

export default messageRouter;
