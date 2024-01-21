import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiRespose.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
  // get all details from front-end
  const { firstName, lastName, username, email, mobileNumber, password } = req.body;

  // validation - not empty
  if (
    [firstName, lastName, username, email, mobileNumber, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists: email or username
  const existedUser = await User.findOne({
    $or: [{ email }, {mobileNumber}, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with this email or mobile number or username already exists");
  }

  // create user object - create entry in db
  const user = await User.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
    username: username?.toLowerCase(),
  });

  // remove password and refreshToken field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully..."));
});

const loginUser = asyncHandler(async (req, res) => {
  
  // get user details from front-end
  const {email, username, password} = req.body;

  // check if credentials are empty
  if(!(email || username)){
    throw new ApiError(400, "username or email is required")
  }

  // find the user
  const user = await User.findOne(
    {
      $or: [{email}, {username}]
    }
  )

  // check if user exist or not
  if(!user){
    throw new ApiError(404, "User does not exist")
  }

  // check password
  const isPasswordValid = await user.isPasswordCorrect(password)

  if(!isPasswordValid) {
    throw new ApiError(401,"Invalid user credentials")
  }
  
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      {
        user: loggedInUser
      },
      "User logged in successfully"
    )
  )

})

export { registerUser, loginUser };
