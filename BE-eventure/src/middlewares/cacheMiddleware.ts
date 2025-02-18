// src/middlewares/cacheMiddleware.ts
import { Request, Response, NextFunction } from "express";
import redis from "../utils/redisClient";

export const cacheMiddleware = (key: string, expireTime: number = 3600) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cachedData = await redis.get(key);

      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }

      res.locals.cacheKey = key;
      res.locals.cacheExpireTime = expireTime;
      next();
    } catch (error) {
      console.error("Redis Cache Error:", error);
      next();
    }
  };
};
