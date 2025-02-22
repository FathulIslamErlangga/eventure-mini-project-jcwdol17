import api from "@/utils/api/axios";
import { IAnalytics } from "@/utils/interfaces/customInsterface";
import { transactionResponse } from "@/utils/interfaces/customInsterface";

export const analyticsMountly = async (range: string) => {
  try {
    const response = await api.get<IAnalytics>(`/analytics/v1?range=${range}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const analyticsYearly = async (range: string) => {
  try {
    const response = await api.get<IAnalytics>(`/analytics/v1?range=${range}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const transactions = async () => {
  try {
    const response = await api.get<transactionResponse>("/midtrans/v5");
    return response.data;
  } catch (error) {
    throw error;
  }
};
