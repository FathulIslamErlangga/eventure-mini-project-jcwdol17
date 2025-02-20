import { Request } from "express";
import { ValidationRequest } from "../utils/interfaceCustom";
import { checkoutLogger } from "../utils/logger";
import { appError } from "../utils/responses";
import prisma from "../utils/prismaClient";
import { snap } from "../utils/midtransConfig";

export class transactionService {
  async transaction(req: Request) {
    const { eventId, ticketQuantity, codeVoucher, referralPointsUsed } =
      req.body;
    const user = req as ValidationRequest;
    const customerId = user.userData.id;

    if (!customerId) {
      checkoutLogger.warn("Anda belum login, silahkan login terlebih dahulu");
      throw new appError(
        "Anda belum login, silahkan login terlebih dahulu",
        404
      );
    }
    if (!eventId || !ticketQuantity) {
      checkoutLogger.warn("eventId dan ticketQuantity diperlukan");
      throw new appError("eventId dan ticketQuantity diperlukan", 404);
    }

   
    const transactionData = await prisma.$transaction(
      async (tsx) => {
        const event = await tsx.event.findUnique({
          where: { id: eventId },
        });
        if (!event) {
          checkoutLogger.warn("Event tidak ditemukan");
          throw new appError("Event tidak ditemukan", 404);
        }
        if (event.availableSeats < ticketQuantity) {
          checkoutLogger.warn(
            `Kursi tidak mencukupi untuk event: ${event.name}`
          );
          throw new appError("Kursi tidak mencukupi", 400);
        }

        // Process voucher jika ada
        let voucherDiscount = 0;
        let voucherId: string | null = null;
        if (codeVoucher) {
          const voucher = await tsx.voucher.findFirst({
            where: {
              code: codeVoucher,
              OR: [{ userId: customerId }, { global: true }],
            },
            include: { user: true },
          });
          if (!voucher) {
            checkoutLogger.warn("Voucher tidak tersedia");
            throw new appError("Voucher tidak tersedia", 404);
          }
          const now = new Date();
          if (now < voucher.startDate || now > voucher.endDate) {
            checkoutLogger.warn(`Voucher tidak aktif ${voucher.code}`);
            throw new appError("Voucher tidak aktif", 400);
          }
          if (!voucher.global) {
            checkoutLogger.warn(
              `Voucher tidak berlaku untuk event ini ${voucher.code}`
            );
            throw new appError("Voucher tidak berlaku untuk event ini", 400);
          }
          if (voucher.usageLimit <= 0) {
            checkoutLogger.warn(
              `Voucher telah mencapai batas penggunaan ${voucher.code}`
            );
            throw new appError("Voucher telah mencapai batas penggunaan", 400);
          }
          voucherDiscount = voucher.discount;
          voucherId = voucher.id;
          await tsx.voucher.update({
            where: { id: voucherId },
            data: { usageLimit: Number(voucher.usageLimit) - 1 },
          });
        }

        // sum total price
        let totalPrice = event.price * ticketQuantity;
        if (voucherDiscount > 0) {
          totalPrice -= (totalPrice * voucherDiscount) / 100;
        }

        // process referral
        if (referralPointsUsed && referralPointsUsed > 500) {
          const wallet = await tsx.wallet.findUnique({
            where: { userId: customerId },
          });
          if (!wallet || wallet.points < referralPointsUsed) {
            checkoutLogger.warn(
              `Poin tidak cukup. Poin yang ada: ${wallet?.points}`
            );
            throw new appError("Poin tidak cukup", 400);
          }
          totalPrice -= referralPointsUsed;
          if (totalPrice < 0) totalPrice = 0;
          const updatedWallet = await tsx.wallet.update({
            where: { userId: customerId },
            data: { points: { decrement: Number(referralPointsUsed) } },
          });
          const point = await tsx.pointLog.findFirst({
            where: { walletId: updatedWallet.id },
          });
          if (!point) {
            checkoutLogger.warn("Log poin tidak ditemukan untuk wallet ini");
            throw new appError(
              "Log poin tidak ditemukan untuk wallet ini",
              404
            );
          }
          await tsx.pointLog.create({
            data: {
              type: "SPENT",
              description: "Poin telah digunakan",
              amount: Number(-referralPointsUsed),
              walletId: updatedWallet.id,
              expirationDate: point.expirationDate,
            },
          });
        }

        const transaction = await tsx.transaction.create({
          data: {
            customer: { connect: { id: customerId } },
            event: { connect: { id: eventId } },
            status: "WAITING_PAYMENT",
            ticketQuantity: Number(ticketQuantity),
            referralPointsUsed: Number(referralPointsUsed) || 0,
            totalPrice,
            ...(voucherId && { voucher: { connect: { id: voucherId } } }),
            expiresAt: new Date(Date.now() + 30).toISOString(),
            paymentMethod: "E_WALLET",
          },
        });

        await tsx.event.update({
          where: { id: eventId },
          data: { availableSeats: event.availableSeats - ticketQuantity },
        });

        return { transactionId: transaction.id, customerId, totalPrice };
      },
      { timeout: 10000 }
    );

    const userData = await prisma.user.findUnique({
      where: { id: transactionData.customerId },
      include: { profile: true },
    });
    if (!userData || !userData.profile) {
      checkoutLogger.warn("User tidak ditemukan");
      throw new appError("User tidak ditemukan", 404);
    }
    const customerDetails = {
      name: userData.profile.name,
      email: userData.email,
      phone: userData.profile.phone,
    };

    // Panggil API eksternal Midtrans setelah transaksi berhasil
    const addToMidtrans = {
      transaction_details: {
        order_id: transactionData.transactionId,
        gross_amount: transactionData.totalPrice,
      },
      credit_card: { secure: true },
      customer_details: customerDetails,
    };

    const { token, redirect_url } = await snap.createTransaction(addToMidtrans);
    checkoutLogger.info(`Redirect URL Midtrans: ${redirect_url}`);
    return token;
  }
}
