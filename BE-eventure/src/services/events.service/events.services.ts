import { Request } from "express";
import {
  ICreateEvents,
  Meta,
  ValidationRequest,
} from "../../utils/interfaceCustom";
import prisma from "../../utils/prismaClient";
import { appError } from "../../utils/responses";
import slugify from "slugify/slugify";
import { pagination } from "../../utils/pagination";
import { ComponentEvent } from "./eventComponent.services";

export class EventsServices {
  private component = new ComponentEvent();
  async createEventServices(req: Request, create: ICreateEvents) {
    const Request = req as ValidationRequest;
    const userId = Request.userData.id;
    const userRole = Request.userData.role;
    const files = Request.files;
    const slug = slugify(create.name, { lower: true, strict: true });
    const coverImage = files.cover?.[0];
    const thumbnailImage = files.thumbnail?.[0];

    if (!coverImage || !thumbnailImage) {
      throw new appError("Cover and thumbnail images are required", 400);
    }

    if (userRole !== "ORGANIZER") {
      throw new appError("you do not have permission to create an event", 403);
    }

    return prisma.$transaction(async (tsx) => {
      const newAddress = await tsx.address.create({
        data: {
          address: create.address.address.toLowerCase(),
          city: create.address.city.toLowerCase(),
        },
      });

      return this.component.createComponent(
        tsx,
        Request,
        create,
        slug,
        userId,
        newAddress
      );
    });
  }

  async getAllEvent(req: Request) {
    const { city, categoryId, search, page, limit } = req.query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 5;
    const { skip, take } = pagination(pageNumber, limitNumber);
    const filters: any = {};
    if (search) {
      filters.OR = [
        { name: { contains: String(search).toLocaleLowerCase() } },
        { description: { contains: String(search).toLocaleLowerCase() } },
      ];
    }

    if (city) {
      filters.address = {
        city: { contains: String(city).toLocaleLowerCase() },
      };
    }

    if (categoryId) {
      filters.categoryId = String(categoryId);
    }
    const countEvent = await prisma.event.count({
      where: filters,
    });
    const listEvents = await prisma.event.findMany({
      where: filters,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        categoryId: true,
        slug: true,
        address: {
          select: {
            id: true,
            address: true,
            city: true,
          },
        },
        startDate: true,
        endDate: true,
        price: true,
        availableSeats: true,
        gallery: {
          select: {
            id: true,
            imageUrl: true,
            imageType: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    const dataMeta: Meta = {
      currentPage: pageNumber,
      totalPages: Math.ceil(countEvent / take),
      totalItems: countEvent,
      perPage: take,
      hasNextPage: pageNumber * take < countEvent,
      hasPrevPage: pageNumber > 1,
    };

    return { dataMeta, listEvents };
  }

  async getEventBySlug() {}
}
