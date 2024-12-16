import express from "express";
import {
  changePassword,
  getCurrentUser,
  login,
  logout,
  searchUsers,
  sendOTP,
  signup,
  updateAccountDetails,
  uploadAvatar,
} from "../controllers/user.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

// Insecured routes
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/send-otp").post(sendOTP);

// secured routes
userRouter.route("/").get(verifyAccessToken, searchUsers);
userRouter
  .route("/update-avatar")
  .post(verifyAccessToken, upload.single("avatar"), uploadAvatar);

userRouter.route("/change-password").patch(verifyAccessToken, changePassword);
userRouter
  .route("/update-account-details")
  .patch(verifyAccessToken, updateAccountDetails);

userRouter.route("/current-user").get(verifyAccessToken, getCurrentUser);
userRouter.route("/logout").post(verifyAccessToken, logout);

export default userRouter;
