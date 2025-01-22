import { Auth } from "../controllers/auth.controller";
import express from "express";
import { protectedAuth } from "../middlewares/auth.middleware";

const authRouter = () => {
  const auth = new Auth();
  const router = express.Router();
  router.post("/auth/register", auth.registerUser);
  router.post("/auth/login", protectedAuth, auth.loginUser);
  router.get("/auth/logout", protectedAuth, auth.logoutUser);
  router.get("/verify-email", auth.verifyEmail);

  return router;
};
export default authRouter;
