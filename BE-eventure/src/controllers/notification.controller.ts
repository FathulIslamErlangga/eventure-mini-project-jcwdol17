import asyncHandler from "../middlewares/asyncHandler";
import { INotification } from "../utils/interfaceCustom";
import { notifLogger } from "../utils/logger";
import prisma from "../utils/prismaClient";

export class Notification {
  createNotification = async (create: INotification) => {
    try {
      const created = await prisma.notification.create({
        data: {
          title: create.title,
          message: create.message,
          userId: create.userId,
          createdAt: create.createdAt,
        },
      });
      notifLogger.info(`Notification succsessfuly ${create.title}`);
      return created;
    } catch (error) {
      notifLogger.error(`Failed to send notification ${create.title}`);
    }
  };
}
