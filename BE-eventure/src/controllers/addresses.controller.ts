import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import prisma from "../utils/prismaClient";
import { appError, appSuccsess } from "../utils/responses";

export class Addresses {
  getAddress = asyncHandler(async (req: Request, res: Response) => {
    const address = await prisma.address.findMany({
      select: {
        id: true,
        address: true,
        city: true,
        events: true,
        profiles: true,
      },
    });

    if (!address) {
      throw new appError("Address not found", 404);
    }

    appSuccsess(201, "get data address succsess", res, address);
  });
}
