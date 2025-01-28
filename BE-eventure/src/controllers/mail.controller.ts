import asyncHandler from "../middlewares/asyncHandler";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { IUser, jwtPayload } from "../utils/interfaceCustom";
import prisma from "../utils/prismaClient";
import { appError, appSuccsess } from "../utils/responses";
import bcrypt from "bcrypt";

export class Mail {
  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token) {
      res.status(400).json({
        message: "token is required",
      });
      return;
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET!
    ) as jwtPayload;

    console.log("Decoded token:", decoded);
    if (typeof decoded !== "string") {
      const user = decoded as IUser;
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!existingUser) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isEmailVerified: true,
        },
      });
      res.status(200).json({ message: "Email verified successfully." });
    }
  });

  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;
    const { newPassword, confirmPassword } = req.body;

    const hashPassword = await bcrypt.hash(newPassword, 10);

    if (!token) {
      throw new appError("token is required", 400);
    }
    if (newPassword !== confirmPassword) {
      throw new appError("password do not match", 400);
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET!
    ) as jwtPayload;

    if (typeof decoded !== "string") {
      const user = decoded as IUser;
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!existingUser) {
        throw new appError("User not found", 404);
      }
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashPassword,
        },
      });
      appSuccsess(200, "Password has been reset successfully.", res);
    }
  });
}
