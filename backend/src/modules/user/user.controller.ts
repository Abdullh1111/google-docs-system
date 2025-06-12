import { Request, Response } from "express";
import { catchAsync } from "../../hooks/catchAsync";
import { userService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);

  res.send({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const signInUser = catchAsync(async (req: Request, res: Response) => {
  const {token, userExist} = await userService.signInUser(req.body);

  res.send({
    accessToken: token,
    success: true,
    message: "User signed in successfully",
    data: userExist,
  });
});

export const userController = {
  createUser,
  signInUser,
};
