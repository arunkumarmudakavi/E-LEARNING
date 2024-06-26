import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiRespose.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
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

const registerUser = asyncHandler(async (req, res) => {
  // get all details from front-end
  // console.log(req.body);
  const { firstName, lastName, username, email, mobileNumber, password } =
    req.body;

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
    $or: [{ email }, { mobileNumber }, {username}],
  });
  // console.log(existedUser);

  if (existedUser) {
    throw new ApiError(
      409,
      "User with this email or mobile number already exists"
    );
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

  // console.log(user);

  // remove password and refreshToken field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // console.log(createdUser);
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
  const { email, username, password } = req.body;

  // console.log("pwd: ", password);
  // check if credentials are empty
  if (!(email || username)) {
    throw new ApiError(400, "username or email is required");
  }

  // find the user
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  // console.log("user : ", user);
  // check if user exist or not
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // check password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
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
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
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

    const user = await User.findById(decodedToken?._id);

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

const getCurrentUser = asyncHandler(async (req, res) => {
  // console.log(req);
  const currentUser = await User.findOne(req.user).select(
    "-createdAt -updatedAt"
  );
  // console.log(currentUser);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200, 
        currentUser, 
        "User details fetched successfully"
      )
    );
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  // console.log(isPasswordCorrect);

  if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const getVideos = asyncHandler(async (_, res) => {
  // console.log(req.thumbnail);
  const videos = await Video.find();
  // .select(
  //   "-createdAt -updatedAt"
  // );
  // console.log(videos);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200, 
        videos, 
        "Videos fetched successfully"
      )
    );
});

const getVideo = asyncHandler(async (req, res) => {
  console.log(req.params._id);
  const data = req.params._id
  const videos = await Video.findById(data);
  console.log(videos);
  // .select(
  //   "-createdAt -updatedAt"
  // );
  // console.log(videos.videoFile);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200, 
        videos, 
        "Video fetched successfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changePassword,
  getVideos,
  getVideo,
};
