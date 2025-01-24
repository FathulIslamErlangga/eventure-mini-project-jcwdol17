import { Profile } from "../controllers/profile.controller";
import express from "express";
import { protectedAuth } from "../middlewares/auth.middleware";
import upload from "../utils/uploadImage";

const profileRouter = () => {
  const profile = new Profile();
  const router = express.Router();
  router.patch(
    "/profiles/v1/:slug",
    protectedAuth,
    upload.single("imageProfile"),
    profile.profileUser
  );

  return router;
};
export default profileRouter;
