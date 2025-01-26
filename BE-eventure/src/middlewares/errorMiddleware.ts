import { NextFunction, Response, Request } from "express";
import { appError } from "../utils/responses";

export const pagetNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new appError(`path not found ${req.originalUrl}`, 400);
  next(error);
};

export const errorMiddleware = (
  err: appError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof appError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  console.error(err.stack);

  res.status(statusCode).json({
    status: "error",
    message,
  });
};
