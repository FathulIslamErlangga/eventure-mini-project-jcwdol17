import prisma from "../utils/prismaClient";
import { cronLogger } from "../utils/logger";
import cron from "node-cron";
import redis from "../utils/redisClient";
import { Worker } from "bullmq";
import pointExpiredQueue from "../queue/expiredPointWorkers.queue";
import { Notification } from "../controllers/notification.controller";
const data = new Notification();
const expiredReferralPoint = new Worker(
  "point-expiry-queue",
  async () => {
    try {
      const now = new Date();
      const warningThreshold = new Date();
      warningThreshold.setDate(now.getDate() + 3);

      const warningPoint = await prisma.pointLog.findMany({
        where: {
          expirationDate: { gte: now, lte: warningThreshold },
          type: "EARNED",
        },
        include: {
          wallet: {
            select: {
              id: true,
              points: true,
              user: true,
            },
          },
        },
      });
      for (const point of warningPoint) {
        await data.createNotification({
          title: "Warning!, your point will expire soon",
          message: `You have ${
            point.amount
          } points which will expire in ${point.expirationDate?.toLocaleDateString()}. `,
          userId: point.wallet.user.id,
          createdAt: now,
        });
      }

      const expiredPoint = await prisma.pointLog.findMany({
        where: {
          expirationDate: { lte: now },
          type: "EARNED",
        },
        include: {
          wallet: {
            select: {
              id: true,
              points: true,
              user: true,
            },
          },
        },
      });

      if (expiredPoint.length === 0) {
        cronLogger.info("No expired points found.");
        return;
      }

      for (const points of expiredPoint) {
        if (!points.wallet) continue;
        await prisma.wallet.update({
          where: { id: points.walletId },
          data: {
            points: { decrement: points.amount },
          },
        });

        await prisma.pointLog.update({
          where: { id: points.id },
          data: {
            description: "point expired",
            amount: -points.amount,
            type: "EXPIRED",
          },
        });
        await data.createNotification({
          title: "Warning!, your point have expired",
          message: `You lost ${-points.amount} points because they have passed the expiration date. `,
          userId: points.wallet.user.id,
          createdAt: now,
        });
      }
      cronLogger.info(
        `Batch ${expiredPoint.length} poin referral expired diproses.`
      );
    } catch (error) {
      cronLogger.error(`Error in cronjob: ${error}`);
    }
  },
  { connection: redis }
);
export default expiredReferralPoint;
cron.schedule("0 0 * * *", async () => {
  cronLogger.info("Running cron job: Deleting expired referral points...");

  await pointExpiredQueue.add("expired-points", {});
});
