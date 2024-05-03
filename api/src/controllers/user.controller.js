import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req,res)=>{
    const { email, username, password } = req.body;
  if (
    [email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "user with email or username already exist");
  }

  const user = await User.create({
    username,
    email,
    password
  })

  const createdUser = await User.findById(user._id).select("-password");

  if(!createdUser){
    throw new ApiError(500, "something went wrong registering user")
  }

  return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"))

})

export const loginUser = asyncHandler(async (req,res)=>{
  const { email, username, password } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "username or email required");
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    throw new ApiError(404, "user do not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const accessToken = await user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "user logged in successfully"
      )
    );
})

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

export const updateUser = asyncHandler(async (req,res)=>{
  try {
    const entryToUpdate  = await User.findById(req.user._id);
    const {username, email, password} = req.body;
    const filteredFields = {
        username,
        email,
        password
    }
    if(!entryToUpdate){
        throw new ApiError(404, "user not found");
    }
    Object.assign(entryToUpdate, filteredFields);
    console.log(entryToUpdate);
    const updatedUser = await entryToUpdate.save();
    return res.json( new ApiResponse(200,updatedUser,"Entry updated successfully"))
  } catch (error) {
      console.log("Error while updating user", error);
      throw error;
  }
})