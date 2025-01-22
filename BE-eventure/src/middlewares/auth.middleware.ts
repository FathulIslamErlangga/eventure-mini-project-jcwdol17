import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler";
import { IUser, ValidationRequest } from "../utils/interfaceCustom";
import jwt from "jsonwebtoken";
import { PrismaClient } from ".prisma/client";

interface jwtPayload {
  id: string;
}
const prisma = new PrismaClient();
export const protectedAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const Request = req as ValidationRequest;
    const authorization = Request.headers.authorization;

    let token = authorization?.split("")[1];

    const secret = process.env.JWT_SECRET!;
    if (!token) {
      token = req.cookies.jwt;
    }

    if (!token) {
      res.status(402).json({
        message: "no authorized, no token provided",
      });
      return;
    }

    const jwtDecoded = jwt.verify(token!, secret) as jwtPayload;

    if (typeof jwtDecoded !== "string") {
      const userData = jwtDecoded as IUser;

      const user = await prisma.user.findUnique({
        where: { id: userData.id },
        include: {
          profile: true,
          wallet: true,
        },
      });
      if (!user) {
        res.status(402).json({
          message: "user not found",
        });
      }

      if (!user?.isEmailVerified) {
        res.status(402).json({
          message: "Please verification your email",
        });
      }

      Request.userData = {
        id: user!.id,
        email: user!.email,
        role: user!.role,
        isEmailVerified: user!.isEmailVerified,
      };
    }
    next();
  }
);
