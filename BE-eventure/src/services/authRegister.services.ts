import slugify from "slugify/slugify";
import bcrypt from "bcrypt";
import "dotenv/config";
import prisma from "../utils/prismaClient";
import { Request } from "express";
import { appError } from "../utils/responses";
import redis from "../utils/redisClient";

export class authService {
  async registerUser(req: Request) {
    const { email, password, name } = req.body;
    const referralCode = req.query.code as string;

    const hashPassword = await bcrypt.hash(password, 10);
    const countUser = await prisma.user.count();
    const isRole = countUser === 0 ? "ORGANIZER" : "CUSTOMER";
    const referralCodeGenerated = `REF-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
    const voucherCodeGenerated = `DISC-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    const slug = slugify(name, { lower: true, strict: true });
    const defaultProfile = process.env.PROFILE_DEFAULT!;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new appError(
        "Email is already in use. Please use a different email.",
        403
      );
    }

    let referrer = null;
    if (referralCode) {
      referrer = await prisma.user.findUnique({
        where: { code: referralCode },
      });
      if (!referrer) throw new appError("Invalid referral code", 403);
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        role: isRole,
        slug,
        code: referralCodeGenerated,
        profile: {
          create: {
            name,
            imageProfile: {
              create: [
                {
                  imageUrl: defaultProfile,
                  imageType: "profile",
                },
              ],
            },
          },
        },
        wallet: {
          create: {
            balance: 0,
            points: 0,
          },
        },
      },
      include: { profile: true },
    });
    // const cacheKey = `user:${newUser.id}`;
    // await redis.del(cacheKey);
    if (referrer) {
      const referral = await prisma.referral.create({
        data: {
          referrerId: referrer.id,
        },
      });

      await prisma.referralLog.create({
        data: {
          referralsId: referral.id,
          referredId: newUser.id,
          rewardGiven: true,
        },
      });

      await prisma.wallet.update({
        where: { userId: referrer.id },
        data: {
          points: { increment: 10000 },
          pointLogs: {
            create: {
              type: "EARNED",
              amount: 10000,
              expirationDate: new Date(
                new Date().setMonth(new Date().getMonth() + 3)
              ),
              description: "bonus point referral",
            },
          },
        },
      });

      await prisma.voucher.create({
        data: {
          code: voucherCodeGenerated,
          discount: 10,
          usageLimit: 1,
          global: true,
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          user: { connect: { id: newUser.id } },
        },
      });
    }
    // await redis.setex(cacheKey, 3600, JSON.stringify(newUser));
    return newUser;
  }
}
