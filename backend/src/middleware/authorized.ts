import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { TUser } from "../modules/user/user.interface";
import { Types } from "mongoose";
import { AppError } from "../hooks/AppError";

export interface Iuser extends TUser {
  id: Types.ObjectId;
}
export interface CustomRequest extends Request {
  user?: Iuser;
}

export const authorized = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer ")) {
     token = authHeader.split(" ")[1]; // Get the token after "Bearer"
    // console.log("Token:", token);
  } else {
    const error = new AppError(400, "Token not found");
    next(error);
  }

  if (!token) {
    const error = new AppError(400, "Token not found");
    next(error);
  }
  const tokenSecret = config.JWT_SECRET;

  try {
    const payload = jwt.verify(token as string, tokenSecret) as Iuser;
    // console.log(payload);
    req.user = payload;
    next();
  } catch (err) {
    const error = new Error("Token not valid");
    next(error);
  }
};
