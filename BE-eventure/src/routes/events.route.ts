import express from "express";
import { Events } from "../controllers/events.controller";
import { protectedAuth } from "../middlewares/auth.middleware";
import upload from "../utils/uploadImage";
import { validateRequest } from "../middlewares/validationRequest.middleware";
import { createEventSchema } from "../middlewares/validation.middleware";

const eventRoute = () => {
  const router = express.Router();
  const events = new Events();

  router.post(
    "/events/v1",
    protectedAuth,
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
    validateRequest(createEventSchema),
    events.createEvent
  );
  router.get("/events/v2", events.getAllEvent);
  router.get("/events/v3/:slug", events.getEventsBySlug);
  router.patch(
    "/events/v4/:slug",
    protectedAuth,
    upload.fields([{ name: "cover" }, { name: "thumbnail" }]),
    events.updateEvents
  );

  return router;
};
export default eventRoute;
