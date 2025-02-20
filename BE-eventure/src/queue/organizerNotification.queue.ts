import { Queue, Worker } from "bullmq";
import redis from "../utils/redisClient";
import prisma from "../utils/prismaClient";
import { appError } from "../utils/responses";
import { checkoutLogger } from "../utils/logger";

export const organizerNotification = new Queue("StatusApproval", {
  connection: redis,
});

const worker = new Worker(
  "StatusApproval",
  async (job) => {
    const { status, transactionId, organizerId } = job.data;
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { event: true, customer: true },
    });
    if (!transaction) {
      checkoutLogger.warn("Data Transaction not found");
      throw new appError("Data Transaction not found", 404);
    }

    const findOwnerEvent = transaction.event.organizerId !== organizerId;
    if (findOwnerEvent) {
      checkoutLogger.warn(
        `You are not the owner of this event, ${transaction.event.name}`
      );
      throw new appError(
        `You are not the owner of this event, ${transaction.event.name}`,
        403
      );
    }

    if (["DONE", "EXPIRED", "REJECTED"].includes(transaction.status)) {
      checkoutLogger.warn(
        `You can't change status with transaction ${transaction.status}`
      );
      throw new appError(
        `You can't change status with transaction ${transaction.status}`,
        403
      );
    }

    const updateStatusTransaction = await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        status,
      },
    });
    await prisma.statusLog.create({
      data: {
        status,
        transactionId: updateStatusTransaction.id,
        changedAt: new Date(),
      },
    });

    await prisma.notification.create({
      data: {
        userId: updateStatusTransaction.customerId,
        title: "Updated your status transaction",
        message: `Status Transaction change ${updateStatusTransaction.status}`,
      },
    });

    checkoutLogger.info(
      `Update status succssesfully: ${transaction.customer.email}`
    );
    return updateStatusTransaction;
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
