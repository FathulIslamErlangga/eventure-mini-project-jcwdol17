import { Mail } from "../controllers/mail.controller";
import express from "express";

export const mailRoute = () => {
  const mail = new Mail();
  const router = express.Router();
  router.get("/verify-email", mail.verifyEmail);
  return router;
};
