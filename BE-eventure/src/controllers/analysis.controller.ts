import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { TransactionStatus } from "@prisma/client";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import prisma from "../utils/prismaClient";

export class Analytics {
  getProfit = asyncHandler(async (req: Request, res: Response) => {
    const { range, startDate, endDate } = req.query;
    const now = new Date();
    let filter = {
      status: TransactionStatus.DONE,
      createdAt: {},
    };

    if (startDate && endDate) {
      const start = parseISO(startDate as string);
      const end = parseISO(endDate as string);
      filter.createdAt = { gte: start, lte: end };
    } else if (range === "daily") {
      filter.createdAt = { gte: startOfDay(now), lte: endOfDay(now) };
    } else if (range === "weekly") {
      filter.createdAt = { gte: startOfWeek(now), lte: endOfWeek(now) };
    } else if (range === "monthly") {
      filter.createdAt = { gte: startOfMonth(now), lte: endOfMonth(now) };
    } else if (range === "yearly") {
      filter.createdAt = { gte: startOfYear(now), lte: endOfYear(now) };
    } else {
      filter.createdAt = { gte: startOfDay(now), lte: endOfDay(now) };
    }

    const result = await prisma.transaction.aggregate({
      _sum: { totalPrice: true },
      where: filter,
    });

    res.json({ totalProfit: result._sum.totalPrice || 0 });
  });
}
