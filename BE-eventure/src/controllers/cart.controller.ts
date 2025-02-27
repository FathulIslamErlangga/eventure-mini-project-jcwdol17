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
  getOwnerEvent = asyncHandler(async (req: Request, res: Response) => {
    const user = req as ValidationRequest;
    const usersId = user.userData.id;

    const events = await prisma.event.findFirst({
      where: { organizerId: usersId },
      include: { organizer: true },
    });
    if (!events) {
      cartLogger.warn("Events not found");
      throw new appError("Events not found", 404);
    }

    const attendee = await prisma.attendee.findMany({
      where: { organizerId: events.organizerId },
      include: {
        transaction: true,
        user: {
          include: { attendee: true },
        },
        organizer: true,
        event: {
          include: {
            gallery: true,
            address: true,
          },
        },
      },
    });
    cartLogger.warn(
      `get data attendee customer succsess ${events.organizer.email}`
    );
    appSuccsess(201, "get data attendee customer succsess", res, attendee);
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
    const { slug } = req.params;
    const { checkedIn } = req.body;

    const users = await prisma.user.findUnique({
      where: { slug },
      include: { attendee: true },
    });
    if (!users) {
      cartLogger.warn("user not found");
      throw new appError("user not found", 404);
    }
    const attendee = await prisma.attendee.findFirst({
      where: { userId: users.id },
    });
    if (!attendee) {
      cartLogger.warn("attendee not found");
      throw new appError("attendee not found", 404);
    }

    if (attendee.checkedIn === true) {
      cartLogger.warn(`Attendee sudah melakukan check-in: ${users.email}`);
      throw new appError("Attendee sudah melakukan check-in", 404);
    }

    const updateAttendee = await prisma.attendee.update({
      where: { id: attendee.id },
      data: {
        checkedIn: Boolean(checkedIn),
      },
    });
    cartLogger.info(`updated checkin succsessfully: ${users.email}`);
    appSuccsess(201, "updated checkin succsessfully", res, updateAttendee);
  });

  getSlugAttendee = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const user = await prisma.user.findUnique({
      where: { slug },
      include: { attendee: true },
    });

    if (!user) {
      cartLogger.warn("user not found");
      throw new appError("user not found", 404);
    }

    const getDataSlug = await prisma.attendee.findUnique({
      where: { id: user.attendee[0].id },
      include: {
        user: true,
        organizer: true,
        transaction: true,
        event: {
          include: {
            gallery: true,
            address: true,
          },
        },
      },
    });
    cartLogger.info(`get detail attendee succsess: ${user.email}`);
    appSuccsess(201, "get detail attendee succsess", res, getDataSlug);
  });
}
