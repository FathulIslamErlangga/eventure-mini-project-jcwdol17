import { Auth } from "../controllers/auth.controller";
import express from "express";
import { protectedAuth } from "../middlewares/auth.middleware";

const authRouter = () => {
  const auth = new Auth();
  const router = express.Router();
  router.post("/auth/v1", auth.registerUser);
  router.post("/auth/v2", auth.loginUser);
  router.get("/auth/v3", protectedAuth, auth.logoutUser);
  router.get("/auth/v4", auth.verifyEmail);

  return router;
};
export default authRouter;
