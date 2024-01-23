import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiRespose.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})

    return {
      accessToken,
      refreshToken
    }
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token")
  }
}

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

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
  
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {
        user: loggedInUser, accessToken, refreshToken
      },
      "User logged in successfully"
    )
  )

})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(
    new ApiResponse(
      200,
      {},
      "User Logged Out"
    )
  )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if(!incomingRefreshToken) throw new ApiError(401, "Unauthorized request")

  try{
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken?._id)

    if(!user) throw new ApiError(401, "Invalid refresh token")

    if(incomingRefreshToken !== user?.refreshToken) throw new ApiError(401, "Refresh token is expired or used")

    const options = {
      httpOnly: true,
      secure: true
    }

    const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken: newRefreshToken,
        },
        "Access token refreshed"
      )
    )
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token")
  }

})

const registerChannel = asyncHandler(async (req, res) => {
  const {channelName, channelPassword} = req.body;

  if(
    [channelName, channelPassword].some((field) => field?.trim() === "")
  ){
    throw new ApiError(400, "All fields are required")
  }

  const existedUser = await User.findOne({channelName})
  console.log(existedUser);

  if(existedUser) throw new ApiError(409, "User with this channel name already exists.")
  

  const avatarLocalPath = req.files?.avatar[0].path;
  // console.log(req.files?.avatar[0]?.path);
  // console.log(avatarLocalPath);

  if(!avatarLocalPath) throw new ApiError(400, "Avatar file is required")

  const avatar = await uploadCloudinary(avatarLocalPath)

  if(!avatar) throw new ApiError(400, "Avatar file is required")

  const userId = await User.findById(req.user?._id)//error
  console.log(userId);
  
  const channelIdGenerator = (len, arr) => {
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans +=
            arr[(Math.floor(Math.random() * arr.length))];
    }
    console.log(ans)
  }
  console.log(avatar.url);

  const channelId = channelIdGenerator(8, '1234567890ABCDEFGH');

  const user = await User.create(
    {
      channelName,
      channelId,
      userId: userId._id,
      channelPassword,
      avatar: avatar.url,
    }
  )


  return res
  .status(201)
  .json(
    new ApiResponse(
      200,
      user,
      "User Registered Successfully"
    )
  )

})

export { registerUser, loginUser, logoutUser, refreshAccessToken, registerChannel };
