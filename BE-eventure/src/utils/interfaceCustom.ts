import { Address, Role } from ".prisma/client";
import { Request } from "express";

export interface IUser {
  id: string;
  email: string;
  role: Role;
  slug: string;
  isEmailVerified: boolean;
}

export interface jwtPayload {
  id: string;
}

export interface ValidationRequest extends Request {
  userData: IUser;
  file: Express.Multer.File;
  files: { [fieldname: string]: Express.Multer.File[] };
}

export interface ICreateEvents {
  name: string;
  description: string;
  categoryId: string;
  address: {
    address: string;
    city: string;
  };
  startDate: Date;
  endDate: Date;
  price: number;
  availableSeats: number;
}
export interface IUpdateEvents {
  name: string;
  description: string;
  categoryId: string;
  address: {
    address: string;
    city: string;
  };
  startDate: Date;
  endDate: Date;
  price: number;
  availableSeats: number;
}

export interface IGalleries {
  imageUrl: string;
  imageType: string;
}

export interface IFilters {
  categoryId: string;
  city: string;
  name: string;
  description: string;
}
export interface Meta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ICreateReviews {
  comment: string;
  rating: number;
}

export interface INotification {
  title: string;
  message: string;
  userId: string;
  createdAt: Date;
}
