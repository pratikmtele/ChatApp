import JWT from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const verifyAccessToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken)
    return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));

  try {
    const decodedToken = JWT.verify(accessToken, process.env.JWT_SECRET);

    const user = await User.findById({ _id: decodedToken._id }).select(
      "-password"
    );

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(400, error.message || "Invalid access token");
  }
};

export { verifyAccessToken };
