import { Profile } from "../controllers/profile.controller";
import express from "express";
import { protectedAuth } from "../middlewares/auth.middleware";
import upload from "../utils/uploadImage";
import { validateRequest } from "../middlewares/validationRequest.middleware";
import { profileUpdateSchema } from "../middlewares/validation.middleware";

const profileRouter = () => {
  const profile = new Profile();
  const router = express.Router();
  router.get("/profiles/v1/:slug", protectedAuth, profile.getProfile);
  router.patch(
    "/profiles/v2/:slug",
    protectedAuth,
    upload.single("imageProfile"),
    validateRequest(profileUpdateSchema),
    profile.updateProfile
  );
  router.patch("/profiles/v3/:slug", protectedAuth, profile.changePassword);
  return router;
};
export default profileRouter;
