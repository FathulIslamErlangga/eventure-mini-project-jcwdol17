import { Response, Request } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { profileServices } from "../services/profile.sevices";
import { appError, appSuccsess } from "../utils/responses";
import prisma from "../utils/prismaClient";
import bcrypt from "bcrypt";

const profile = new profileServices();
export class Profile {
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const data = await profile.getProfile(req);
    appSuccsess(201, "get data profile successfully", res, data);
  });
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const updateProfile = await profile.profileUpdate(req);
    res.status(200).json({
      message: "profile updated successfuly",
      data: updateProfile,
    });
  });
  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { newPassword, oldPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { slug },
    });
    if (!user) {
      throw new appError("User not found", 404);
    }

    const compareOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!compareOldPassword) {
      throw new appError("Invalid current password", 401);
    }

    const hasPasswrod = await bcrypt.hash(newPassword, 10);
    const newData = await prisma.user.update({
      where: { slug },
      data: {
        password: hasPasswrod,
      },
    });
    const withOutPassword = { ...newData, password: undefined };
    appSuccsess(200, "Update password succsessfuly", res, withOutPassword);
  });
}
