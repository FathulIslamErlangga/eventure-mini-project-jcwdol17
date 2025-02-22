import { transactionResponse } from "@/utils/interfaces/customInsterface";
import { useEffect, useState } from "react";
import { getTransactions } from "../services/transactions.services";

const useTransactionsHooks = () => {
  const [transactions, setTransactions] = useState<transactionResponse>();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  return {
    transactions,
    message,
    error,
  };
};

export default useTransactionsHooks;
