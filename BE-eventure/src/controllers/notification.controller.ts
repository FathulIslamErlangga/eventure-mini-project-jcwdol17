import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { INotification, ValidationRequest } from "../utils/interfaceCustom";
import { notifLogger } from "../utils/logger";
import prisma from "../utils/prismaClient";
import { TransactionStatus } from "@prisma/client";
import { appError, appSuccsess } from "../utils/responses";
import { paymentNotificationQueue } from "../queue/paymentNotification.queue";

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

  paymentNotification = asyncHandler(async (req: Request, res: Response) => {
    const { order_id, transaction_status, fraud_status } = req.body;

    await paymentNotificationQueue.add("paymentNotification", {
      orderId: order_id,
      transactionStatus: transaction_status,
      fraudStatus: fraud_status,
    });

    appSuccsess(201, "Notification processed successfully", res);
  });

  getNotification = asyncHandler(async (req: Request, res: Response) => {
    const user = req as ValidationRequest;
    const userId = user.userData.id;
    if (!userId) {
      notifLogger.warn("User not found , please login first");
      throw new appError("User not found", 404);
    }
    const notifications = await prisma.notification.findMany({
      where: { userId },
      select: {
        id: true,
        isRead: true,
        title: true,
        message: true,
        
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
    // if (!notifications) {
    //   notifLogger.warn(`notification not found ${user.userData.email}`);
    //   throw new appError("notification not found", 404);
    // }
    notifLogger.info(`get data notification succsess `);
    appSuccsess(201, "get data notification succsess", res, notifications);
  });
}
