import { Router } from "express";
import {
  registerChannel,
  refreshAccessToken,
  loginChannel,
  logoutChannel,
  uploadVideo,
  getChannelDetails,
  changePassword,
  changeAvatar,
} from "../controllers/channel.controller.js";
import { verifyJWTChannel } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const channelRouter = Router();

channelRouter.route("/refresh-token").post(refreshAccessToken);
channelRouter.route("/registerChannel").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerChannel
);

channelRouter.route("/login-channel").post(loginChannel);
channelRouter.route("/logout-channel").post(verifyJWTChannel, logoutChannel);
channelRouter.route("/uploadVideo").post(
  verifyJWTChannel,
  upload.any([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadVideo
);

channelRouter.route("/channelProfile").get(verifyJWTChannel, getChannelDetails);
channelRouter.route("/changePassword").post(verifyJWTChannel, changePassword);
// channelRouter.route("/avatar").patch(verifyJWTChannel, upload.single("avatar"), changeAvatar)
channelRouter.route("/avatar").patch(verifyJWTChannel, changeAvatar)

export { channelRouter };
