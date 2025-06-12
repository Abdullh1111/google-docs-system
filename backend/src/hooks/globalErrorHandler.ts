import { NextFunction, Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = err.message || "Internal Server Error";
  const status = 500;
  console.log(err);

  res.status(status).send({
    success: false,
    message,
    error: err,
  });
}
