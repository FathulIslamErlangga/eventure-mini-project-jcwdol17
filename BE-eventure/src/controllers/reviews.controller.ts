import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { ICreateReviews } from "../utils/interfaceCustom";
import { reviewServices } from "../services/reviews.service/reviews.services";
import { appSuccsess } from "../utils/responses";

export class Reviews {
  private reviews = new reviewServices();
  createReviews = asyncHandler(async (req: Request, res: Response) => {
    const create: ICreateReviews = req.body;
    const reviewUser = await this.reviews.reviewsCreated(req, create);

    appSuccsess(201, "your reviews succsess", res, reviewUser);
  });
}
