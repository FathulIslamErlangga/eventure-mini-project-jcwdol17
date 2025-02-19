import { Addresses } from "../controllers/addresses.controller";
import express from "express";

const addressRoute = () => {
  const address = new Addresses();
  const router = express.Router();
  router.get("/addresses/v1", address.getAddress);
  return router;
};

export default addressRoute;
