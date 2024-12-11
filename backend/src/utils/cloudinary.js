import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, foldername) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: foldername,
    });

    // unlink localFile
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.log("Cloudinary Error: ", error);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    return null;
  }
};

const deleteFromCloudinary = async (publicid) => {
  try {
    await cloudinary.uploader.destroy(publicid);
  } catch (error) {
    console.log("Cloudinary Error: ", error);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
