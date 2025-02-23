import {
  getTransactions,
  getTransactionSlug,
  updateStatusPayment,
} from "@/services/transactions.services";

import {
  transactionResponse,
  transactionsResponse,
} from "@/utils/interfaces/customInsterface";
import { PaymentMethod } from "@/utils/interfaces/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const transactionsHooks = () => {
  const [transaction, setTransaction] = useState<transactionsResponse>();
  const [transactions, setTransactions] = useState<transactionResponse>();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    getTransactionBySlug(slug as string);
  }, []);

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

  return {
    uploadProof,
    transactions,
    transaction,
  };
};

export default transactionsHooks;
