import api from "@/utils/api/axios";
import {
  transactionResponse,
  transactionsResponse,
} from "@/utils/interfaces/customInsterface";

export const getTransactions = async () => {
  try {
    const response = await api.get<transactionResponse>("/midtrans/v5");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTransactionSlug = async (slug: string) => {
  try {
    const response = await api.get<transactionsResponse>(`midtrans/v3/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusPayment = async (id: string, status: string) => {
  try {
    const response = await api.patch<transactionsResponse>(
      `/midtrans/v2/${id}`,
      { status }
    );
    console.log("status", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
