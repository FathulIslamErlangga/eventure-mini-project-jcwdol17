import api from "@/utils/api/axios";
import { transactionResponse } from "@/utils/interfaces/customInsterface";

export const getTransactions = async () => {
  try {
    const response = await api.get<transactionResponse>("/midtrans/v5");
    return response.data;
  } catch (error) {
    throw error;
  }
};
