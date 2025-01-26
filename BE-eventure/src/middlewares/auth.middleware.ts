import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler";
import { IUser, ValidationRequest } from "../utils/interfaceCustom";
import jwt from "jsonwebtoken";
import { PrismaClient } from ".prisma/client";
import { appError } from "../utils/responses";

interface jwtPayload {
  id: string;
}
const prisma = new PrismaClient();
export const protectedAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const Request = req as ValidationRequest;
    const { authorization } = req.headers;
    const secret = process.env.JWT_SECRET!;

    let token: string | undefined;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      console.log("token", token);
    }
    if (!token && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new appError("no authorized, no token provided", 401);
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
        throw new appError("User not found", 404);
      }

      if (!user?.isEmailVerified) {
        throw new appError("User not found", 401);
      }

      Request.userData = {
        id: user!.id,
        email: user!.email,
        role: user!.role,
        slug: user!.slug,
        isEmailVerified: user!.isEmailVerified,
      };
    }
    next();
  }
);

export const checkRole = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const Request = req as ValidationRequest;
    const user = Request.userData?.role;
    console.log("akses:", user);
    console.log("akses 2:", role);

    if (user !== role) {
      throw new appError("Access forbidden", 403);
    }
    next();
  };
};
