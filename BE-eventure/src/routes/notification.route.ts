import express from "express";
import { Notification } from "../controllers/notification.controller";
import { protectedAuth } from "../middlewares/auth.middleware";

const notifRoute = () => {
  const notifications = new Notification();
  const router = express.Router();
  router.post("/notification/v1", notifications.paymentNotification);
  router.get("/notification/v2", protectedAuth, notifications.getNotification);
  return router;
};

export default notifRoute;
