import { PrismaClient } from ".prisma/client";
import asyncHandler from "../middlewares/asyncHandler";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import { createSendToken, signToken } from "../utils/jwt";
import { sendVerificationEmail } from "../utils/verifyEmail";
import { IUser } from "../utils/interfaceCustom";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
interface jwtPayload {
  id: string;
}
export class Auth {
  registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const referralCode = req.query.code as string;

    const hashPassword = await bcrypt.hash(password, 10);
    const countUser = await prisma.user.count();
    const isRole = countUser === 0 ? "ORGANIZER" : "CUSTOMER";
    const referralCodeGenerated = `REF-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
    const voucherCodeGenerated = `DISC-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    const defaultProfile = process.env.PROFILE_DEFAULT!;

    let referrer = null;
    if (referralCode) {
      referrer = await prisma.user.findUnique({
        where: { code: referralCode },
      });
      if (!referrer) {
        res.status(400).json({
          message: "invalid referral code",
        });
      }
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        role: isRole,
        code: referralCodeGenerated,
        profile: {
          create: {
            name,
            imageProfile: {
              create: [
                {
                  imageUrl: defaultProfile,
                  imageType: "profile",
                },
              ],
            },
          },
        },
        wallet: {
          create: {
            balance: 0,
            points: 0,
          },
        },
      },
    });

    if (referrer) {
      const referral = await prisma.referral.create({
        data: {
          referrerId: referrer.id,
        },
      });

      await prisma.referralLog.create({
        data: {
          referralsId: referral.id,
          referredId: newUser.id,
          rewardGiven: true,
        },
      });

      await prisma.wallet.update({
        where: { userId: referrer.id },
        data: {
          points: { increment: 10000 },
          pointLogs: {
            create: {
              type: "EARNED",
              amount: 10000,
              description: "bonus point referral",
            },
          },
        },
      });

      await prisma.voucher.create({
        data: {
          code: voucherCodeGenerated,
          discount: 10,
          usageLimit: 1,
          global: true,
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          user: { connect: { id: newUser.id } },
        },
      });
    }
    const token = signToken(newUser.id);
    await sendVerificationEmail(newUser.email, token);
    createSendToken(
      newUser,
      "User registered, Please verify your email.",
      res,
      201
    );
  });

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
      console.log("User data", user);
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

  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({
        message: "user not found",
      });
      return;
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (user && comparePassword) {
      return createSendToken(user, "User login successfully.", res, 201);
    }
    res.status(402).json({
      message: "invalid login",
    });
  });

  logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const isDev = process.env.NODE_ENV === "development" ? true : false;

    res.cookie("jwt", "", {
      httpOnly: true,
      secure: isDev,
      expires: new Date(0),
    });

    res.status(201).json({
      message: "User logout Succsessfully",
    });
  });
}
