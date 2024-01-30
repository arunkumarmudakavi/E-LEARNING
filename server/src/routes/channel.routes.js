import { Router } from "express";
import {
  registerChannel,
  refreshAccessToken,
  loginChannel,
  logoutChannel,
} from "../controllers/channel.controller.js";
import { verifyJWTChannel } from "../middlewares/channelAuth.middleware.js";
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

export { channelRouter };
