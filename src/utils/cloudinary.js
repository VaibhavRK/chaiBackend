import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// coudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (localFilePath) => {
  try {
    if (!localFilePath) return new Error("Please attach the File first!");

    const response = await cloudinary.uploader.upload(localFilePath);
    console.log("File Uploaded", response);
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return new Error("File not Uploaded");
  }
};

export { cloudinaryUpload };
