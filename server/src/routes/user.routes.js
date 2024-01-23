import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  registerChannel,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/registerChannel").post(
  verifyJWT,
  upload.fields([{
    name: "avatar",
    maxCount: 1,
  }]),
  registerChannel
);

export { userRouter };
