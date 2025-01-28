import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from ".prisma/client";
import { Response } from "express";

export const signToken = (id: string) => {
  if (!id) {
    throw new Error("userid is required to sing the token ");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not set in envroiment  ");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "10d",
  });
};

export const createSendToken = (
  user: User,
  message: string,
  res: Response,
  statusCode: number
) => {
  const token = signToken(user.id);
  const isDev = process.env.NODE_ENV === "development" ? true : false;
  const cookieOpstions = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isDev,
  };

  res.setHeader("Authorization", `Bearer ${token}`);
  res.cookie("jwt", token, cookieOpstions);

  const withOutPassword = { ...user, password: undefined };
  res.status(statusCode).json({
    message,
    data: withOutPassword,
    token,
  });
};
