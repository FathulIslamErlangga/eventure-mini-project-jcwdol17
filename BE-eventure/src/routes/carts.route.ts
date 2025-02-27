import express from "express";
import { Cart } from "../controllers/cart.controller";
import { protectedAuth } from "../middlewares/auth.middleware";

const cartRoute = () => {
  const cart = new Cart();
  const router = express.Router();
  router.post("/carts/v1", protectedAuth, cart.createCart);
  router.get("/carts/v2/:slug", protectedAuth, cart.getItem);
  router.delete("/carts/v3/:attendeeId", protectedAuth, cart.deleteItem);
  router.patch("/carts/v4/:slug", protectedAuth, cart.updatedAttendee);
  router.get("/carts/v5", protectedAuth, cart.getOwnerEvent);
  router.get("/carts/v6/:slug", protectedAuth, cart.getSlugAttendee);
  return router;
};

export default cartRoute;
