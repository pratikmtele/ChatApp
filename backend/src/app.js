import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// express middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.static("public"));

app.use(cookieParser());

// importing routers here
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import { verifyAccessToken } from "./middlewares/auth.middleware.js";
import { ApiResponse } from "./utils/ApiResponse.js";

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);

// protected route
app.post("/api/v1/protected", verifyAccessToken, (req, res) => {
  const user = req.user;

  return res.status(200).json(new ApiResponse(200, user, "Success"));
});

export { app };
