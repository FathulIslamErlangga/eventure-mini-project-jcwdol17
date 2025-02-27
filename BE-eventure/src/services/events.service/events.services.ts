import { Request } from "express";
import {
  ICreateEvents,
  IUpdateEvents,
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

    const slug = slugify(create.name, { lower: true, strict: true });

    if (userRole !== "ORGANIZER") {
      throw new appError("you do not have permission to create an event", 403);
    }

    let formattedAddress = create.address;
    if (typeof formattedAddress === "string") {
      try {
        formattedAddress = JSON.parse(formattedAddress);
      } catch (error) {
        throw new appError("Invalid address format", 400);
      }
    }

    return await prisma.$transaction(async (tsx) => {
      const newAddress = await tsx.address.create({
        data: {
          address: formattedAddress.address.toLowerCase(),
          city: formattedAddress.city.toLowerCase(),
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
        { name: { contains: String(search), mode: "insensitive" } },
        { description: { contains: String(search), mode: "insensitive" } },
      ];
    }

    if (city) {
      filters.address = {
        city: { contains: String(city), mode: "insensitive" },
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

  async getEventBySlug(req: Request) {
    const { slug } = req.params;

    return await this.component.getBySlug(slug);
  }
  
  async deleteEvent(req: Request) {
    const { slug } = req.params;
    const Request = req as ValidationRequest;
    const userId = Request.userData.id;
    const userRole = Request.userData.role;
  
    // Check user permissions
    if (userRole !== "ORGANIZER") {
      throw new appError("You do not have permission to delete this event", 403);
    }
  
    return await prisma.$transaction(async (tsx) => {
      // Find the event first
      const event = await tsx.event.findUnique({
        where: { slug },
        include: {
          address: true,
          gallery: true,
        },
      });
  
      if (!event) {
        throw new appError("Event not found", 404);
      }
  
      // Check if the event belongs to the user
      if (event.organizerId !== userId) {
        throw new appError("You can only delete your own events", 403);
      }
  
      // Delete associated gallery images
      await tsx.gallery.deleteMany({
        where: { eventId: event.id }
      });
  
      // Delete the event first (this will automatically handle the address reference)
      const deletedEvent = await tsx.event.delete({
        where: { slug }
      });
  
      // Optionally, if you want to explicitly handle address deletion
      // Only delete address if no other events are using it
      if (event.addressId) {
        const otherEventsWithSameAddress = await tsx.event.count({
          where: { addressId: event.addressId }
        });
  
        if (otherEventsWithSameAddress === 0) {
          await tsx.address.delete({
            where: { id: event.addressId }
          });
        }
      }
  
      return deletedEvent;
    });
  }

  async updatedEvent(req: Request, updated: IUpdateEvents) {
    const { slug } = req.params;
    const Request = req as ValidationRequest;
    const userRole = Request.userData.role;
    const files = Request.files || {};
    const coverImage = files.cover?.[0] || null;
    const thumbnailImage = files.thumbnail?.[0] || null;

    
    return await prisma.$transaction(async (tsx) => {
      const event = await prisma.event.findUnique({
        where: { slug },
        include: {
          address: true,
          category: true,
          gallery: true,
        },
      });

      if (!event) {
        throw new appError("Data event not found", 404);
      }
      if (userRole !== "ORGANIZER") {
        throw new appError(
          "You do not have permission to update this event",
          403
        );
      }

      if (coverImage || thumbnailImage) {
        await this.component.imageComponentUpdate(tsx, Request, event);
      }

      if (
        updated.address &&
        (updated.address.address || updated.address.city)
      ) {
        await tsx.address.update({
          where: { id: event.addressId },
          data: {
            address: updated.address.address,
            city: updated.address.city,
          },
        });
      }
      const newSlug = updated.name
        ? slugify(updated.name, { lower: true, strict: true })
        : event.slug;

      return await this.component.updatedComopnent(
        tsx,
        updated,
        newSlug,
        event
      );
    });
  }
}
