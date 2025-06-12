import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("Authorization");
  if (!token) {
    const error = new Error("Token not found");
    next(error);
  }
  const tokenSecret = config.JWT_SECRET;

  try {
    const payload = jwt.verify(token as string, tokenSecret);
    req.body = payload;
    next();
  } catch (err) {
    const error = new Error("Token not valid");
    next(error);
  }
};
