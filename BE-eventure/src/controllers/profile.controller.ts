import { Response, Request } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { profileServices } from "../services/profile.sevices";
import { appSuccsess } from "../utils/responses";

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
}
