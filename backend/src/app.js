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
app.use("/api/v1/users", userRouter);

export { app };
