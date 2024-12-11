import express from "express";

const userRouter = express.Router();

userRouter.route("/signup").post();

export default userRouter;
