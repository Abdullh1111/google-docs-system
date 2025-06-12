import { Router } from "express";
import { userController } from "./user.controller";
import {
  signInValidation,
  signupValidation,
} from "../../middleware/uservalidation";

const userRouter = Router();

userRouter.post("/register", signupValidation, userController.createUser);
userRouter.post("/login", signInValidation, userController.signInUser);

export default userRouter;
