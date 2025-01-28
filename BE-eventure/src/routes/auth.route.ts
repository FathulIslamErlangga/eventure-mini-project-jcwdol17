import express from "express";
import { Auth } from "../controllers/auth.controller";
import { protectedAuth } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validationRequest.middleware";
import {
  loginUserSchema,
  registerUserSchema,
} from "../middlewares/validation.middleware";

const authRouter = () => {
  const auth = new Auth();
  const router = express.Router();
  router.post(
    "/auth/v1",
    validateRequest(registerUserSchema),
    auth.registerUser
  );
  router.post("/auth/v2", validateRequest(loginUserSchema), auth.loginUser);
  router.get("/auth/v3", protectedAuth, auth.getUser);
  router.get("/auth/v4", protectedAuth, auth.logoutUser);
  router.post("/auth/v5", auth.forgotPassword);

  return router;
};
export default authRouter;
