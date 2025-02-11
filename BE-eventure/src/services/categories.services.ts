import { Request } from "express";
import { ValidationRequest } from "../utils/interfaceCustom";
import slugify from "slugify";
import { appError } from "../utils/responses";
import prisma from "../utils/prismaClient";

export class categoryServices {
  async createCategories(req: Request) {
    const { name } = req.body;
    const Request = req as ValidationRequest;
    const userRole = Request.userData.role;
    const slug = slugify(name, { lower: true, strict: true });

    if (userRole !== "ORGANIZER") {
      throw new appError("you do not have permission to create an event", 403);
    }

    return await prisma.category.create({
      data: {
        name,
        slug,
      },
    });
  }

  async getCategories() {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    if (!categories.length) {
      throw new appError("categories not found", 404);
    }

    return categories;
  }

  async updatedCategory(req: Request) {
    const { slug } = req.params;
    const { name } = req.body;
    const Request = req as ValidationRequest;
    const userRole = Request.userData.role;
    const newSlug = slugify(name, { lower: true, strict: true });

    if (userRole !== "ORGANIZER") {
      throw new appError("you do not have permission to update an event", 403);
    }
    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      throw new appError("categories not found", 404);
    }

    return await prisma.category.update({
      where: { id: category.id },
      data: {
        name: name || category.name,
        slug: newSlug || category.slug,
      },
    });
  }
}
