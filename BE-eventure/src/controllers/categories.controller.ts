import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { categoryServices } from "../services/categories.services";
import { appSuccsess } from "../utils/responses";

export class Category {
  private category = new categoryServices();
  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const categories = await this.category.createCategories(req);
    appSuccsess(201, "add new categories succsessfully", res, categories);
  });

  getCategory = asyncHandler(async (req: Request, res: Response) => {
    const categories = await this.category.getCategories();
    appSuccsess(201, "get data categories successfully", res, categories);
  });

  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const categories = await this.category.updatedCategory(req);
    appSuccsess(201, "updated data categories successfully", res, categories);
  });
}
