import axios from "axios";
import { BASE_URL } from "@/utils/constant";
import {
  AnalyticsResponse,
  ProfitTrackFilter,
} from "@/utils/interfaces/customInsterface";

export const AnalyticsService = {
  async getTotalProfit(filter?: ProfitTrackFilter): Promise<number> {
    try {
      const response = await axios.get<AnalyticsResponse>(
        `${BASE_URL}/analytics/v1`,
        {
          params: {
            range: filter?.range || "daily",
            startDate: filter?.startDate,
            endDate: filter?.endDate,
          },
        }
      );
      return response.data.totalProfit;
    } catch (error) {
      console.error("Error fetching total profit:", error);
      throw error;
    }
  },
};
