import { Queue } from "bullmq";
import redis from "../utils/redisClient";

const pointExpiredQueue = new Queue("point-expiry-queue", {
  connection: redis,
});
export default pointExpiredQueue;
