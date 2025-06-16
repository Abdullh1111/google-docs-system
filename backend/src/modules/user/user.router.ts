import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../../config/cloudinary";
import { authorized } from "../../middleware/authorized";
import {
  signInValidation,
  signupValidation,
} from "../../middleware/uservalidation";
import { userController } from "./user.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const userRouter = Router();

userRouter.post(
  "/register",
  upload.single("avatar"),
  uploadImage,
  signupValidation,
  userController.createUser
);
userRouter.post("/login", signInValidation, userController.signInUser);
userRouter.post("/logout", userController.logoutUser);
userRouter.get("/user", authorized, userController.userData);

export default userRouter;
