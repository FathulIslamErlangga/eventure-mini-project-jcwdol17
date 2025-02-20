import express from "express";
import { Notification } from "../controllers/notification.controller";

const notifRoute = () => {
  const notifications = new Notification();
  const router = express.Router();
  router.post("/notification/v1", notifications.paymentNotification);
  return router;
};

export default notifRoute;
