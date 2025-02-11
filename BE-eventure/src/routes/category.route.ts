import express from "express";
import { Category } from "../controllers/categories.controller";
import { protectedAuth } from "../middlewares/auth.middleware";

const categoryRoute = () => {
  const router = express.Router();
  const category = new Category();

  router.post("/categories/v1", protectedAuth, category.createCategory);
  router.get("/categories/v2", category.getCategory);
  router.patch("/categories/v3/:slug", protectedAuth, category.updateCategory);

  return router;
};
export default categoryRoute;
