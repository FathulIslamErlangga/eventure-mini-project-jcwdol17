// @ts-nocheck
import MidtransClient from "midtrans-client";
import "dotenv/config";

export const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});
