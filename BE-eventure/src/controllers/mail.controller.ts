import asyncHandler from "../middlewares/asyncHandler";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { IUser, jwtPayload } from "../utils/interfaceCustom";
import prisma from "../utils/prismaClient";

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
}
