import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const signup = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;

  if (
    [username, email, fullname, password].some((field) => field.trim() === "")
  )
    throw new ApiError(400, "All fields are required");

  const existingUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (existingUser)
    throw new ApiError(
      400,
      "User is already exist with this email or username"
    );

  try {
    const newUser = await User.create({
      username,
      email,
      fullname,
      password,
    });

    const createdUser = await User.findById({ _id: newUser._id }).select(
      "-password"
    );

    if (!createdUser) throw new ApiError(404, "User not found");

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
    throw new ApiError(
      400,
      "Something went wrong while generating access token."
    );

  return accessToken;
};

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if ([username, password].some((field) => field.trim() === ""))
    throw new ApiError(400, "All fields are required");

  const user = await User.findOne({ username: username });

  if (!user) throw new ApiError(404, "User not found with this credentials");

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) throw new ApiError(401, "Invalid Credentials");

  const loggedUser = await User.findById({ _id: user._id }).select("-password");
  try {
    const accessToken = await generateAccessToken(user._id);

    if (!accessToken) throw new ApiError(400, "Access is not generated");

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, loggedUser, "User logged in successfully"));
  } catch (error) {
    throw new ApiError(400, "Something went wrong while user logging");
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
};
