import { Response } from "express";
import { Meta } from "./interfaceCustom";

export class appError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message), (this.statusCode = statusCode || 500);

    Error.captureStackTrace(this, this.constructor);
  }
}

export const appSuccsess = (
  statusCode: number,
  message: string,
  res: Response,
  data?: any,
  token?: string,
  meta?: Meta
) => {
  res.status(statusCode).json({
    message,
    data,
    token,
    meta,
  });
};
