import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import MailSender from "../mail/mailSender.js";

const signup = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;
  try {
    if (
      [username, email, fullname, password].some((field) => field.trim() === "")
    ) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "All fields are required"));
    }

    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            {},
            "User already exists with this email or username"
          )
        );
    }

    const newUser = await User.create({
      username,
      email,
      fullname,
      password,
    });

    const createdUser = await User.findById({ _id: newUser._id }).select(
      "-password"
    );

    if (!createdUser) {
      return res.status(404).json(new ApiResponse(404, {}, "User is found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User created successfully"));
  } catch (errors) {
    throw new ApiError(
      400,
      "Somthing went wrong while registering to user",
      errors
    );
  }
});

const generateAccessToken = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new ApiError(404, "User not found");

  const accessToken = await user.generateAccessToken();

  if (!accessToken)
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          {},
          "Something went wrong while registering the user",
          errors
        )
      );

  return accessToken;
};

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if ([username, password].some((field) => field.trim() === "")) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  const user = await User.findOne({ username: username });

  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(404, {}, "User not found with this credentials"));
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json(new ApiResponse(401, {}, "Invalid Credentials"));
  }

  const loggedUser = await User.findById({ _id: user._id }).select("-password");
  try {
    const accessToken = await generateAccessToken(user._id);

    if (!accessToken) throw new ApiError(400, "Access token is not generated");

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, loggedUser, "Logged in successfully"));
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Something went wrong while logging"));
  }
});

const uploadAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing");

  const avatar = await uploadOnCloudinary(avatarLocalPath, "ChatApp/avatar");

  if (!avatar.url)
    throw new ApiError(401, "Avatar is not uplaoded on the cloudinary.");

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          avatar: avatar.url,
        },
      },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Avatar Updated successfully"));
  } catch (error) {
    if (avatar.url) {
      await deleteFromCloudinary(avatar.public_id);
    }

    throw new ApiError(400, "Something went wrong while uploading avatar");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user details"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email, username, bio } = req.body;

  if ([fullname, email, username, bio].some((field) => field.trim() === ""))
    throw new ApiError(400, "All fields are required");

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullname,
        username,
        email,
        bio,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "Account details updated successfully")
    );
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    throw new ApiError(400, "All fields are required");

  const user = await User.findById({ _id: req.user._id });

  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");

  user.password = newPassword;
  user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const logout = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { fullname: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users searched successfully"));
});

const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Email Id is missing"));
  }

  const user = await User.findOne({ email: email }).select("-password");

  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Email Id doesn't exist in the database"));
  }

  try {
    const OTP = Math.floor(100000 + Math.random() * 900000);

    const currentDate = new Date();
    const expirationTime = new Date(currentDate.getTime() + 1 * 60000);

    // save otp in database
    user.otp.otp = OTP;
    user.otp.expirationTime = expirationTime;
    user.save();

    MailSender(email, OTP);

    return res.status(200).json(new ApiResponse(200, {}, "Otp Sent"));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(
        new ApiResponse(400, {}, "Something went wrong while sending otp.")
      );
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  if (!otp) {
    return res.status(404).json(new ApiResponse(404, {}, "OTP is missing"));
  }

  const user = await User.findOne({ email: email }).select("-password");

  if (!user)
    return res
      .status(400)
      .json(400, {}, "Something went wrong while verifying otp");

  const currentTime = new Date();
  const otpexpirationTime = new Date(user.otp.expirationTime);

  if (currentTime > otpexpirationTime) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          {},
          "The OTP has expired. Please request a new one."
        )
      );
  }

  if (parseInt(otp) !== user.otp.otp) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid OTP"));
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $unset: {
        otp: {},
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "OTP Verified successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password: newPassword, email } = req.body;

  if (!newPassword) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Password is missing"));
  }

  const user = await User.findOne({ email: email });

  if (!user)
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Something went wrong"));

  if (await user.isPasswordCorrect(newPassword)) {
    return res
      .status(400)
      .send(
        new ApiResponse(
          400,
          {},
          "The new password cannot be the same as the old password."
        )
      );
  }

  user.password = newPassword;
  user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});

export {
  signup,
  generateAccessToken,
  login,
  uploadAvatar,
  getCurrentUser,
  updateAccountDetails,
  changePassword,
  logout,
  searchUsers,
  sendOTP,
  verifyOTP,
  resetPassword,
};
