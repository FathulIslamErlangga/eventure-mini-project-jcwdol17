import { Request } from "express";
import { ICreateReviews, ValidationRequest } from "../../utils/interfaceCustom";
import prisma from "../../utils/prismaClient";
import { appError } from "../../utils/responses";
import { string } from "joi/lib";

export class reviewServices {
  async reviewsCreated(req: Request, create: ICreateReviews) {
    const { slug } = req.params;
    const Request = req as ValidationRequest;
    const userId = Request.userData.id;

    const event = await prisma.event.findUnique({
      where: { slug },
    });

    if (!userId) {
      throw new appError("please", 404);
    }
    if (!event) {
      throw new appError("event not found", 404);
    }

    return await prisma.review.create({
      data: {
        comment: create.comment,
        rating: Number(create.rating),
        customerId: userId,
        eventId: event.id,
      },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        customer: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
