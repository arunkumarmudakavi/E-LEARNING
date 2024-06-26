import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiRespose.js";
import { ApiError } from "../utils/ApiError.js";
import { Channel } from "../models/userChannel.model.js";
import {
  uploadCloudinary,
  uploadVideoCloudinary,
} from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await Channel.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerChannel = asyncHandler(async (req, res) => {
  const { channelName, password, firstName, lastName, email, mobileNumber } =
    req.body;

  if (
    [channelName, password, firstName, lastName, email, mobileNumber].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await Channel.findOne({
    $or: [{ channelName }, { email }],
  });
  // console.log(existedUser);

  if (existedUser)
    throw new ApiError(409, "channelname or email already exists.");

  // console.log(req.body);
  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(req.files?.avatar[0]?.path);

  // if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  // const avatar = await uploadCloudinary(avatarLocalPath);

  // if (!avatar) throw new ApiError(400, "Avatar file is required");
  // console.log(req.user);

  // const userId = await User.findById(req.user?._id); //error
  // console.log(userId._id);

  const user = await Channel.create({
    firstName,
    lastName,
    channelName,
    email,
    mobileNumber,
    password,
    // avatar: avatar.url,
  });

  // console.log(user._id);

  // remove refreshToken field from response
  // const exist = await Userchannel.findById(user._id).select("-refreshToken");

  // check for user creation
  // if (!exist) {
  //   throw new ApiError(500, "Something went wrong while registering the user");
  // }

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User Registered Successfully"));
});

const loginChannel = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) throw new ApiError(400, "All fields are required");

  const user = await Channel.findOne({ email });

  if (!user) throw new ApiError(404, "Channel not found");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  // console.log(user._id);
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInChannel = await Channel.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInChannel,
          accessToken,
          refreshToken,
        },
        "Channel logged in successfully"
      )
    );
});

const logoutChannel = asyncHandler(async (req, res) => {
  await Channel.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await Channel.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, "Invalid refresh token");

    if (incomingRefreshToken !== user?.refreshToken)
      throw new ApiError(401, "Refresh token is expired or used");

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

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
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  // console.log(title);
  // console.log(description);
  // console.log(req.body);
  // console.log(req.body.videoName);
 
  const videoPath = req?.files[0]?.path;
  const thumb = req.files[1]?.path;

  // It's working by distructuring video and image path while calling backend API from frontend
  // const videoPath = req.body.videoName;
  // const thumb = req.body.imageName;

  console.log(videoPath);
  console.log(thumb);

  if (!videoPath) throw new ApiError(400, "Video is required");
  if (!thumb) throw new ApiError(400, "Thumbnail is required");

  const vid = await uploadVideoCloudinary(videoPath);
  const thumbnailImg = await uploadCloudinary(thumb);

  if (!vid) throw new ApiError(400, "Video is required");
  if (!thumbnailImg) throw new ApiError(400, "Thumbnail is required");

  const channelId = await Channel.findOne(req.user._id);
  // console.log(channelId);

  const uploadVideo = await Video.create({
    videoFile: vid.url,
    thumbnail: thumbnailImg.url,
    title,
    description,
    owner: channelId._id,
  });

  if (!uploadVideo) throw new ApiError(500, "Something went wrong");

  return res
    .status(201)
    .json(new ApiResponse(200, uploadVideo, "Video uploaded successfully"));
});

const getChannelDetails = asyncHandler(async (req, res) => {
  const channelDetails = await Channel.findOne(req.user).select(
    "-createdAt -updatedAt"
  );
  // console.log(channelDetails);

  return res
    .status(200)
    .json(new ApiResponse(200, channelDetails, "Channel Details"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Channel.findById(req.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  // console.log(isPasswordCorrect);

  if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const changeAvatar = asyncHandler(async (req, res) => {

  // Single file that's file. If multiple then it's files.
  const newAvatarLocalPath = req.file?.path
  if(!newAvatarLocalPath) throw new ApiError(400, "Avatar not found")

  const avatar = await uploadCloudinary(newAvatarLocalPath)
  if(!avatar) throw new ApiError(400, "Error while uploading on cloudinary")

  const user = await Channel.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      }
    },
    {
      new: true,
    }
  ).select("-password");

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      user,
      "Avatar updated successfully"
    )
  )
})

export {
  refreshAccessToken,
  registerChannel,
  loginChannel,
  logoutChannel,
  uploadVideo,
  getChannelDetails,
  changePassword,
  changeAvatar,
};
