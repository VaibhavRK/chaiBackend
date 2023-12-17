import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // username, email, fullName, password
  // files -  avatar, coverImage

  const { username, email, fullName, password } = req.body;

  if (
    [username, fullName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(402, "All fields are Required!");
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(301, "User already Exist");
  }

  const avatarPath = req.files?.avatar[0]?.path;

  if (!avatarPath) {
    throw new ApiError(402, "Upload User Image!");
  }

  let coverImagePath = "";

  if (
    req.files &&
    Array.isArray(req.files.coverImagePath) &&
    req.files.coverImagePath.length > 0
  ) {
    coverImagePath = req.files.coverImagePath[0];
  }

  const avatar = await cloudinaryUpload(avatarPath);
  const coverImage = await cloudinaryUpload(coverImagePath);

  if (avatar) {
    throw new ApiError(501, "User Image Upload Failed");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url | "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "User account failed to create, something went wrong"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdUser, "User account created successfully!")
    );
});

export { registerUser };
