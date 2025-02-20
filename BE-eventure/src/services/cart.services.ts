import { Request } from "express";
import { ValidationRequest } from "../utils/interfaceCustom";
import { cartLogger } from "../utils/logger";
import { appError } from "../utils/responses";
import prisma from "../utils/prismaClient";

export class cartService {
  async createdService(req: Request) {
    const user = req as ValidationRequest;
    const userId = user.userData.id;
    const { eventId, ticketCount } = req.body;
    if (!userId) {
      cartLogger.warn("you are not logged in, please login first ");
      throw new appError("you are not logged in, please login first", 404);
    } else if (!eventId || !ticketCount) {
      cartLogger.warn("eventId and ticketCount is required");
      throw new appError("eventId and ticketCount is required", 404);
    }

    const events = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!events) {
      cartLogger.warn("event not found");
      throw new appError("event not found", 404);
    }
    if (events.availableSeats < ticketCount) {
      cartLogger.warn(`Not enough available seats: ${events.name}`);
      throw new appError(`Not enough available seats: ${events.name}`, 404);
    }

    const existingCart = await prisma.attendee.findFirst({
      where: { eventId, userId, transactionId: undefined },
    });

    let Cart;
    if (existingCart) {
      Cart = await prisma.attendee.update({
        where: { id: existingCart.id },
        data: {
          ticketCount: Number(existingCart.ticketCount) + Number(ticketCount),
        },
      });
    } else {
      Cart = await prisma.attendee.create({
        data: {
          eventId,
          ticketCount: Number(ticketCount),
          userId,
        },
      });
    }

    return Cart;
  }

  async getCartData(req: Request) {
    const { slug } = req.params;

    const user = await prisma.user.findUnique({
      where: { slug },
    });
    if (!user?.slug) {
      cartLogger.warn("Unauthorized access to cart");
      throw new appError("Unauthorized access to cart", 403);
    }

    const carts = await prisma.attendee.findMany({
      where: { userId: user.id },
      include: {
        event: {
          include: {
            gallery: true,
          },
        },
      },
    });

    return carts;
  }
  async deleteCartItem(req: Request) {
    const { attendeeId } = req.params;
    const user = req as ValidationRequest;
    const userId = user.userData.id;

    const cartItem = await prisma.attendee.findUnique({
      where: { id: attendeeId, userId },
    });

    if (!cartItem) {
      cartLogger.warn("Cart item not found or unauthorized");
      throw new appError("Cart item not found or unauthorized", 404);
    }

    await prisma.attendee.delete({
      where: { id: attendeeId },
    });

    return;
  }
}
