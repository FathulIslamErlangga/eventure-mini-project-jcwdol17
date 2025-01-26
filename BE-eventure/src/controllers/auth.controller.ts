import asyncHandler from "../middlewares/asyncHandler";
import bcrypt from "bcrypt";
import "dotenv/config";
import prisma from "../utils/prismaClient";
import { Response, Request } from "express";
import { createSendToken, signToken } from "../utils/jwt";
import { sendVerificationEmail } from "../utils/verifyEmail";
import { authService } from "../services/authRegister.services";
import { appError, appSuccsess } from "../utils/responses";

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

  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new appError("User not found.", 404);
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (user && comparePassword) {
      return createSendToken(user, "User login successfully.", res, 201);
    }
    throw new appError("nvalid login. Email or password is incorrect.", 401);
  });

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
