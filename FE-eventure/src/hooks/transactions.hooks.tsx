import {
  createTransactions,
  getTransactions,
  getTransactionSlug,
  getUserTransactionSlug,
  updateStatusPayment,
} from "@/services/transactions.services";

import {
  transactionResponse,
  transactionsResponse,
  transactionsUserResponse,
} from "@/utils/interfaces/customInsterface";
import { PaymentMethod } from "@/utils/interfaces/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const transactionsHooks = () => {
  const [transaction, setTransaction] = useState<transactionsResponse>();
  const [transactions, setTransactions] = useState<transactionResponse>();
  const [userTransactions, setUserTransactions] = useState<transactionsUserResponse>();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    getTransactionBySlug(slug as string);
  }, [slug]);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response);
      setMessage(response.message);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const getTransactionBySlug = async (slug: string) => {
    try {
      const response = await getTransactionSlug(slug);
      setTransaction(response);
    } catch (error) {}
  };

  const uploadProof = async (status: string, id: string) => {
    try {
      const response = await updateStatusPayment(id, status);
      setTimeout(() => {
        getTransactionBySlug(slug as string);
      }, 2000);
      setTransaction(response);
    } catch (error) {}
  };

  const getUserTransactionBySlug = async (
    slug: string
  ): Promise<transactionsUserResponse | undefined> => {
    try {
      const response = await getUserTransactionSlug(slug);
      // Ensure response.data is an array
      setUserTransactions({ message: response.message, data: Array.isArray(response.data) ? response.data : [response.data] });
      return { message: response.message, data: Array.isArray(response.data) ? response.data : [response.data] };
    } catch (error) {
      return undefined;
    }
  };

  const createTransactionData = async (transactionData: {
    eventId: string;
    ticketQuantity: number;
    codeVoucher: string;
    referralPointsUsed: number;
  }): Promise<transactionResponse> => {
    try {
      const response = await createTransactions(transactionData);
      setTransactions(response);
      return response;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return {
    uploadProof,
    transactions,
    transaction,
    userTransactions, // Expose userTransactions
    createTransactionData,
    getTransactionBySlug,
    getUserTransactionBySlug,
  };
};

export default transactionsHooks;