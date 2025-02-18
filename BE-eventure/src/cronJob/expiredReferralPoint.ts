import prisma from "../utils/prismaClient";
import { cronLogger } from "../utils/logger";
import cron from "node-cron";
import redis from "../utils/redisClient";
import { Worker } from "bullmq";
import pointExpiredQueue from "../queue/expiredPointWorkers.queue";

const expiredReferralPoint = new Worker(
  "point-expiry-queue",
  async () => {
    try {
      const expiredPoint = await prisma.pointLog.findMany({
        where: {
          expirationDate: { lte: new Date() },
          type: "EARNED",
        },
        include: {
          wallet: {
            select: {
              id: true,
              points: true,
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
