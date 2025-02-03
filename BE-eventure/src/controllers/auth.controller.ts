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

const authServices = new authService();
export class Auth {
  registerUser = asyncHandler(async (req: Request, res: Response) => {
    const newUser = await authServices.registerUser(req);
    if (!newUser || !newUser.email) {
      throw new appError("Failed to register user or email not defined.", 400);
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

  // Login User
  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new appError("User not found.", 404);
    }

    if (user.isEmailVerified === false) {
      throw new appError("Please verify your email before logging in.  ", 403);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (user && comparePassword) {
      return createSendToken(user, "User login successfully.", res, 201);
    }
    throw new appError("invalid login. Email or password is incorrect.", 401);
  });

  // Get data user
  getUser = asyncHandler(async (req: Request, res: Response) => {
    const Request = req as ValidationRequest;
    const userId = Request.userData.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            imageProfile: true,
            address: true,
          },
        },
      },
    });

    if (!user) {
      throw new appError("user not found", 404);
    }
    const getUser = {
      id: user.id,
      email: user.email,
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
    };
    appSuccsess(201, "Get data user succsessfully", res, getUser);
  });

  // forgot password
  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (email !== user?.email) {
      throw new appError("email do not match", 401);
    }
    if (!user) {
      throw new appError("User not found", 404);
    }
    const resetToken = signToken(user.id);
    sendVerificationForgotPassword(user.email, resetToken);

    appSuccsess(200, "Reset password email has been sent.", res);
  });

  // logout
  logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const isDev = process.env.NODE_ENV === "development" ? true : false;

    res.cookie("jwt", "", {
      httpOnly: true,
      secure: isDev,
      expires: new Date(0),
    });

    appSuccsess(201, "User logout Succsessfully", res);
  });
}
