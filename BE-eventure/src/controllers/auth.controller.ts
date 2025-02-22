import asyncHandler from "../middlewares/asyncHandler";
import bcrypt from "bcrypt";
import "dotenv/config";
import prisma from "../utils/prismaClient";
import { Response, Request } from "express";
import { createSendToken, signToken } from "../utils/jwt";
import {
  sendVerificationEmail,
  sendVerificationForgotPassword,
} from "../utils/verifyEmail";
import { authService } from "../services/authRegister.services";
import { appError, appSuccsess } from "../utils/responses";
import { ValidationRequest } from "../utils/interfaceCustom";
import redis from "../utils/redisClient";
import { userLogger } from "../utils/logger";

const authServices = new authService();
export class Auth {
  registerUser = asyncHandler(async (req: Request, res: Response) => {
    const newUser = await authServices.registerUser(req);
    if (!newUser || !newUser.email) {
      userLogger.warn(
        `Failed to register user or email not defined, ${newUser.email}`
      );
      throw new appError("Failed to register user or email not defined.", 400);
    }
    const token = signToken(newUser.id);
    await sendVerificationEmail(newUser.email, token);
    userLogger.info(
      `User registered, Please verify your email., ${newUser.email}`
    );
    createSendToken(
      newUser,
      "User registered, Please verify your email.",
      res,
      201
    );
  });

  // Login User
  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      userLogger.warn(`User not found. ,${email}`);
      throw new appError("User not found.", 404);
    }

    if (user.isEmailVerified === false) {
      userLogger.warn(
        `Please verify your email before logging in. ,${user.email}`
      );
      throw new appError("Please verify your email before logging in.  ", 403);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (user && comparePassword) {
      userLogger.info(`User login succsessfully ,${user.email}`);
      return createSendToken(user, "User login successfully.", res, 201);
    }
    throw new appError("invalid login. Email or password is incorrect.", 401);
  });

  // Get data user
  getUser = asyncHandler(async (req: Request, res: Response) => {
    const Request = req as ValidationRequest;
    const userId = Request.userData.id;

    // const cachedUser = await redis.get(`user:${userId}`);

    // if (cachedUser) {
    //   userLogger.info(
    //     `Fetched user data from cache, ${Request.userData.email}`
    //   );
    //   return appSuccsess(
    //     200,
    //     "Get data user successfully",
    //     res,
    //     JSON.parse(cachedUser)
    //   );
    // }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            imageProfile: true,
            address: true,
          },
        },
        transactions: true,
        attendee: true,
        wallet: {
          include: {
            pointLogs: true,
          },
        },
      },
    });

    if (!user) {
      userLogger.warn(`User not found , ${Request.userData.email}`);
      throw new appError("user not found", 404);
    }
    const getUser = {
      id: user.id,
      email: user.email,
      slug: user.slug,
      code: user.code,
      role: user.role,
      profile: {
        name: user.profile?.name,
        phone: user.profile?.phone,
        imageProfile: user.profile?.imageProfile.map((image) => ({
          id: image.id,
          imageUrl: image.imageUrl,
          imageType: image.imageType,
        })),
        address: {
          id: user.profile?.address?.id,
          address: user.profile?.address?.address,
          city: user.profile?.address?.city,
        },
      },
      wallet: {
        id: user.wallet?.id,
        points: user.wallet?.points,
        pointLogs: user.wallet?.pointLogs.map((_) => ({
          id: _.id,
          type: _.type,
          amount: _.amount,
          expirationDate: _.expirationDate,
          description: _.description,
        })),
      },
    };
    // await redis.setex(`user:${userId}`, 3600, JSON.stringify(getUser));
    userLogger.info(`Get data user succsessfully, ${getUser.profile.name}`);
    appSuccsess(201, "Get data user succsessfully", res, getUser);
  });

  // forgot password
  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (email !== user?.email) {
      userLogger.warn(`Email do not match, ${user?.email}`);
      throw new appError("email do not match", 401);
    }
    if (!user) {
      userLogger.warn(
        `forgot password failed because user not found, ${email}`
      );
      throw new appError("User not found", 404);
    }
    const resetToken = signToken(user.id);
    sendVerificationForgotPassword(user.email, resetToken);
    userLogger.info(` reset token succsess, ${resetToken}`);

    userLogger.info(` reset password email has been sent, ${user.email}`);
    appSuccsess(
      200,
      "Reset password email has been sent.",
      res,
      undefined,
      resetToken
    );
  });

  // logout
  logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const isDev = process.env.NODE_ENV === "development" ? true : false;

    const user = req as ValidationRequest;
    if (user.userData) {
      await redis.del(`user:${user.userData.id}`);
    }
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: isDev,
      expires: new Date(0),
    });

    userLogger.info("User logout succsessfully");
    appSuccsess(201, "User logout Succsessfully", res);
  });
}
