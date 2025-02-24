import express from "express";
import { protectedAuth } from "../middlewares/auth.middleware";
import { Transactions } from "../controllers/transactions.controller";
import upload from "../utils/uploadImage";

const transactionRoute = () => {
  const transactions = new Transactions();
  const router = express.Router();
  router.post("/midtrans/v1", protectedAuth, transactions.checkout);
  router.patch(
    "/midtrans/v2/:transactionId",
    protectedAuth,
    transactions.statusTransaction
  );
  router.get(
    "/midtrans/v3/:slug",
    protectedAuth,
    transactions.detailTransaction
  );
  router.patch(
    "/midtrans/v4",
    protectedAuth,
    upload.single("payment"),
    transactions.paymentProof
  );
  router.get(
    "/midtrans/v5",

    transactions.getTransaction
  );
  router.get(
    "/midtrans/v6/:slug",
    protectedAuth,
    transactions.detailUserTransaction
  );

  return router;
};

export default transactionRoute;
