import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const messageRouter = express();

// secured routes

// messageRouter.route("/send").post(verifyAccessToken, sendMessage);

export default messageRouter;
