import { Role } from ".prisma/client";
import { Request } from "express";

export interface IUser {
  id: string;
  email: string;
  role: Role;
  isEmailVerified: boolean;
}

export interface ValidationRequest extends Request {
  userData: IUser;
  file: Express.Multer.File;
  files: Express.Multer.File[];
}
