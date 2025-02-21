import { Event } from ".prisma/client";
import { getFilePath } from "../../utils/filePath";
import {
  ICreateEvents,
  IUpdateEvents,
  ValidationRequest,
} from "../../utils/interfaceCustom";
import prisma from "../../utils/prismaClient";
import { appError } from "../../utils/responses";

export class ComponentEvent {
  async createComponent(
    tsx: any,
    req: ValidationRequest,
    create: ICreateEvents,
    slug: string,
    userId: string,
    newAddress: any
  ) {
    const files = req.files;
    const coverImage = files.cover?.[0];
    const thumbnailImage = files.thumbnail?.[0];

    if (!coverImage || !thumbnailImage) {
      throw new appError("Cover and thumbnail images are required", 400);
    }

    return await tsx.event.create({
      data: {
        name: create.name,
        description: create.description,
        slug,
        availableSeats: Number(create.availableSeats),
        price: Number(create.price),
        startDate: new Date(create.startDate),
        endDate: new Date(create.endDate),
        gallery: {
          create: [
            {
              imageUrl: coverImage.path,
              imageType: "cover",
            },
            {
              imageUrl: thumbnailImage.path,
              imageType: "thumbnail",
            },
          ],
        },
        address: { connect: { id: newAddress.id } },
        category: { connect: { id: create.categoryId } },
        organizer: { connect: { id: userId } },
      },
      include: {
        address: {
          select: {
            id: true,
            address: true,
            city: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        gallery: {
          select: {
            id: true,
            imageType: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  async getBySlug(slug: string) {
    return await prisma.event.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        availableSeats: true,
        price: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        address: {
          select: {
            id: true,
            address: true,
            city: true,
          },
        },
        gallery: {
          select: {
            id: true,
            imageUrl: true,
            imageType: true,
          },
        },
        organizer: {
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
        reviews: true,
        transactions: true,
        vouchers: true,
        attendees: true,
      },
    });
  }

  async updatedComopnent(
    tsx: any,
    updated: IUpdateEvents,
    newSlug: string,
    event: Event
  ) {
    return await tsx.event.update({
      where: { id: event.id },
      data: {
        name: updated.name,
        description: updated.description,
        slug: newSlug,
        availableSeats:
          updated.availableSeats !== undefined
            ? Number(updated.availableSeats)
            : event.availableSeats,
        price:
          updated.price !== undefined ? Number(updated.price) : event.price,
        startDate:
          updated.startDate !== undefined
            ? new Date(updated.startDate)
            : event.startDate,
        endDate:
          updated.endDate !== undefined
            ? new Date(updated.endDate)
            : event.endDate,
        categoryId: updated.categoryId,
      },
      include: {
        address: true,
        gallery: true,
        category: true,
        organizer: true,
      },
    });
  }

  async imageComponentUpdate(tsx: any, req: ValidationRequest, event: any) {
    const files = req.files || {};
    const coverImage = files.cover?.[0] || null;
    const thumbnailImage = files.thumbnail?.[0] || null;

    const storageGallery = [];
    if (event.gallery.length) {
      await tsx.gallery.deleteMany({
        where: { eventId: event.id },
      });
    }
    if (coverImage) {
      storageGallery.push({
        eventId: event.id,
        imageUrl: coverImage.path,
        imageType: "cover",
      });
    }
    if (thumbnailImage) {
      storageGallery.push({
        eventId: event.id,
        imageUrl: thumbnailImage.path,
        imageType: "thumbnail",
      });
    }

    if (storageGallery.length > 0) {
      await tsx.gallery.createMany({
        data: storageGallery,
      });
    }
  }
}
