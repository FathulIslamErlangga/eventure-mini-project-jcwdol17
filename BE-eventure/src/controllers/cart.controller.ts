import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { cartService } from "../services/cart.services";
import { cartLogger } from "../utils/logger";
import { ValidationRequest } from "../utils/interfaceCustom";
import { appError, appSuccsess } from "../utils/responses";
import prisma from "../utils/prismaClient";

export class Cart {
  private services = new cartService();
  createCart = asyncHandler(async (req: Request, res: Response) => {
    const user = req as ValidationRequest;
    const userEmail = user.userData.email;
    const carts = await this.services.createdService(req);
    cartLogger.info(`add to cart succsess: ${userEmail}`);
    appSuccsess(201, "add to cart succsess", res, carts);
  });

  getItem = asyncHandler(async (req: Request, res: Response) => {
    const carts = await this.services.getCartData(req);
    cartLogger.info("get data event in cart succsess");
    appSuccsess(201, "get data event in cart succsess", res, carts);
  });

  deleteItem = asyncHandler(async (req: Request, res: Response) => {
    await this.services.deleteCartItem(req);
    cartLogger.info("Cart item deleted successfully");
    appSuccsess(201, "Cart item deleted successfully", res);
  });

  updatedAttendee = asyncHandler(async (req: Request, res: Response) => {
    const user = req as ValidationRequest;
    const userId = user.userData.id;
    const { checkedIn } = req.body;

    const users = await prisma.user.findUnique({
      where: { id: userId },
      include: { attendee: true },
    });

    if (!users) {
      cartLogger.warn("user not found");
      throw new appError("user not found", 404);
    }
    if (users.attendee[0].checkedIn === true) {
      cartLogger.warn(`Attendee sudah melakukan check-in: ${users.email}`);
      throw new appError("Attendee sudah melakukan check-in", 404);
    }

    const updateAttendee = await prisma.attendee.update({
      where: { id: users.attendee[0].id },
      data: {
        checkedIn: Boolean(checkedIn),
      },
    });
    cartLogger.info(`updated checkin succsessfully: ${users.email}`);
    appSuccsess(201, "updated checkin succsessfully", res, updateAttendee);
  });
}
