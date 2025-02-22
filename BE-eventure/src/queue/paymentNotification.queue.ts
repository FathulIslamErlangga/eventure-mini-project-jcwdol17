import { Queue, Worker } from "bullmq";
import redis from "../utils/redisClient";
import prisma from "../utils/prismaClient";
import { TransactionStatus } from "@prisma/client";
import { notifLogger } from "../utils/logger";
import { appError } from "../utils/responses";

export const paymentNotificationQueue = new Queue("paymentNotification", {
  connection: redis,
});

const worker = new Worker(
  "paymentNotification",
  async (job) => {
    const { orderId, transactionStatus, fraudStatus } = job.data;

    const transaction = await prisma.transaction.findUnique({
      where: { id: orderId },
      include: { event: true, customer: true, attendee: true },
    });
    if (!transaction) {
      notifLogger.error("Transaction not found");
      throw new appError("Not found", 404);
    }

    let newStatus;
    if (transactionStatus === "capture") {
      if (fraudStatus === "accept") {
        newStatus = TransactionStatus.WAITING_CONFIRMATION;
      } else if (fraudStatus === "challenge") {
        newStatus = TransactionStatus.WAITING_CONFIRMATION;
      }
    } else if (transactionStatus === "settlement") {
      newStatus = TransactionStatus.WAITING_CONFIRMATION;
    } else if (["cancel", "deny", "expire"].includes(transactionStatus)) {
      newStatus = TransactionStatus.CANCELED;
    } else if (transactionStatus === "pending") {
      newStatus = TransactionStatus.WAITING_PAYMENT;
    }

    if (newStatus && newStatus !== transaction.status) {
      const existingAttendee = await prisma.attendee.findFirst({
        where: {
          eventId: transaction.eventId,
          userId: transaction.customer.id,
        },
      });
      await prisma.transaction.update({
        where: { id: orderId },
        data: { status: newStatus },
      });

      await prisma.notification.create({
        data: {
          userId: transaction.customerId,
          title: "Update Transaction",
          message: `Your status transaction ${newStatus.toLocaleLowerCase()}`,
          createdAt: new Date(),
        },
      });

      if (!existingAttendee) {
        await prisma.attendee.create({
          data: {
            transactionId: orderId,
            eventId: transaction.eventId,
            userId: transaction.customer.id,
            ticketCount: transaction.ticketQuantity,
            organizerId: transaction.event.organizerId,
          },
        });
      } else {
        await prisma.attendee.update({
          where: { id: existingAttendee.id },
          data: {
            transactionId: orderId,
          },
        });
      }

      if (newStatus === TransactionStatus.WAITING_CONFIRMATION) {
        if (transaction.eventId.length > 0) {
          const organizerId = transaction.event.organizerId;

          await prisma.notification.create({
            data: {
              userId: organizerId,
              title: "Waiting for transaction confirmation",
              message: `Transaction ${transaction.customer.email} status WAITING CONFIRMATION, Please confirm payment`,
              createdAt: new Date(),
            },
          });
        }
      }
    }
  },
  {
    connection: redis,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed: ${err.message}`);
});
