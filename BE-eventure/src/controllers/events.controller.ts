import { Response, Request } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { ICreateEvents, IUpdateEvents } from "../utils/interfaceCustom";
import { EventsServices } from "../services/events.service/events.services";
import { appSuccsess } from "../utils/responses";

export class Events {
  private events = new EventsServices();
  createEvent = asyncHandler(async (req: Request, res: Response) => {
    const create: ICreateEvents = req.body;

    const events = await this.events.createEventServices(req, create);

    appSuccsess(201, "add new events succsessfully", res, events);
  });

  getAllEvent = asyncHandler(async (req: Request, res: Response) => {
    const events = await this.events.getAllEvent(req);
    appSuccsess(
      201,
      "get events succsessfully",
      res,
      events.listEvents,
      undefined,
      events.dataMeta
    );
  });

  getEventsBySlug = asyncHandler(async (req: Request, res: Response) => {
    const events = await this.events.getEventBySlug(req);

    appSuccsess(201, "get events by slug succsessfully", res, events);
  });

  updateEvents = asyncHandler(async (req: Request, res: Response) => {
    const updated: IUpdateEvents = req.body;
    const events = await this.events.updatedEvent(req, updated);
    appSuccsess(201, "updated succsessfully", res, events);
  });
}
