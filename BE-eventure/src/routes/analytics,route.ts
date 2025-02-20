import express from "express";
import { Analytics } from "../controllers/analysis.controller";

const analyticsRoute = () => {
  const router = express.Router();
  const analytics = new Analytics();
  router.get("/analytics/v1", analytics.getProfit);
  return router;
};
export default analyticsRoute;
