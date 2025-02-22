import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { ValidationRequest } from "../utils/interfaceCustom";
import { checkoutLogger } from "../utils/logger";
import { appError, appSuccsess } from "../utils/responses";
import { transactionService } from "../services/transaction.services";
import prisma from "../utils/prismaClient";
import { organizerNotification } from "../queue/organizerNotification.queue";
import { getFilePath } from "../utils/filePath";

export class Transactions {
  private data = new transactionService();
  checkout = asyncHandler(async (req: Request, res: Response) => {
    const user = req as ValidationRequest;
    const userEmail = user.userData.email;
    const transaction = await this.data.transaction(req);
    checkoutLogger.info(`Your transaction succsess: ${userEmail}`);
    appSuccsess(201, "Your transaction succsess", res, transaction);
  });

  statusTransaction = asyncHandler(async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    const { status } = req.body;
    const user = req as ValidationRequest;
    const organizerId = user.userData.id;
    await organizerNotification.add("StatusApproval", {
      transactionId,
      status,
      organizerId,
    });
    appSuccsess(201, "Update status succssesfully", res);
  });

  detailTransaction = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const user = await prisma.user.findUnique({
      where: { slug },
    });

    if (!user) {
      checkoutLogger.warn("User not found, please login first");
      throw new appError("User not found, please login first", 404);
    }

    const transactions = await prisma.transaction.findMany({
      where: { customerId: user.id },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            startDate: true,
            endDate: true,
            address: {
              select: { id: true, address: true, city: true },
            },
            category: {
              select: { id: true, name: true },
            },
            organizer: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    checkoutLogger.warn(`get detail transaction: ${user.email}`);
    appSuccsess(201, "get detail transaction", res, transactions);
  });

  paymentProof = asyncHandler(async (req: Request, res: Response) => {
    const Request = req as ValidationRequest;
    const file = Request.file;
    const userId = Request.userData.id;
    const users = await prisma.user.findUnique({
      where: { id: userId },
      include: { transactions: true },
    });
    if (!users) {
      checkoutLogger.warn("user not found");
      throw new appError("user not found", 404);
    }
    let imageUrl = null;
    if (file) {
      imageUrl = getFilePath(file.path, Request);
      if (users.transactions[0].paymentProof !== undefined) {
        await prisma.gallery.deleteMany({
          where: { id: users.id, imageType: "payment" },
        });
      }

      await prisma.gallery.create({
        data: {
          imageUrl,
          imageType: "payment",
        },
      });
    }

    const updateTransactionProof = await prisma.transaction.update({
      where: { id: users.transactions[0].id },
      data: {
        paymentProof: imageUrl,
      },
    });

    checkoutLogger.info(`updated paymentProof succsess: ${users.email}`);
    appSuccsess(
      201,
      "updated paymentProof succsess",
      res,
      updateTransactionProof
    );
  });

  getTransaction = asyncHandler(async (req: Request, res: Response) => {
    const transactions = await prisma.transaction.findMany({
      select: {
        id: true,
        status: true,
        ticketQuantity: true,
        totalPrice: true,
        referralPointsUsed: true,
        paymentProof: true,
        expiresAt: true,
        event: {
          include: {
            address: true,
            category: true,
          },
        },
        attendee: true,
        customer: {
          include: {
            profile: {
              include: {
                imageProfile: true,
              },
            },
          },
        },
      },
    });
    appSuccsess(201, "get data transaction succsess", res, transactions);
  });
}
