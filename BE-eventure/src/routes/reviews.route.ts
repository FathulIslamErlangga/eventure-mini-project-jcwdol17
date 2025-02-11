import express from "express";
import { Reviews } from "../controllers/reviews.controller";
import { protectedAuth } from "../middlewares/auth.middleware";

const reviewRoute = () => {
  const router = express.Router();
  const reviews = new Reviews();

  router.post("/reviews/v1/:slug", protectedAuth, reviews.createReviews);

  return router;
};

export default reviewRoute;
