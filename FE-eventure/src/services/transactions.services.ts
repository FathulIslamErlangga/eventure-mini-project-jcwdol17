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

export const getUserTransactionSlug = async (
  slug: string
): Promise<transactionsResponse> => {
  try {
    const response = await api.get<transactionsResponse>(`midtrans/v6/${slug}`);
    console.log("ini serius cuma segini datanya : ", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTransactions = async (transactionData: {
  eventId: string;
  ticketQuantity: number;
  codeVoucher: string;
  referralPointsUsed: number;
}): Promise<transactionResponse> => {
  try {
    const response = await api.post<transactionResponse>(
      "/midtrans/v1",
      transactionData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadPaymentProof = async (
  file: File
): Promise<transactionResponse> => {
  const formData = new FormData();
  formData.append("payment", file);

  try {
    const response = await api.patch<transactionResponse>(
      "/midtrans/v4",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Ensure this matches your API response structure
  } catch (error) {
    console.error("Error uploading payment proof:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
