import { analyticsMountly, transactions } from "@/services/analiytics.services";
import { IAnalytics } from "@/utils/interfaces/customInsterface";
import { transactionResponse } from "@/utils/interfaces/customInsterface";

import { useEffect, useState } from "react";

const analyticsHooks = () => {
  const [profitYearly, setProfitYearly] = useState<IAnalytics>();
  const [profitMountly, setProfitMountly] = useState<IAnalytics>();
  const [transaction, setTransaction] = useState<transactionResponse>();
  const mountly = "mountly";
  const yearly = "yearly";

  useEffect(() => {
    getProfit();
    getTransactions();
  }, []);

  const getProfit = async () => {
    try {
      const responseMountly = await analyticsMountly(mountly);
      const responseYearly = await analyticsMountly(yearly);
      setProfitYearly(responseYearly);
      setProfitMountly(responseMountly);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    try {
      const response = await transactions();
      setTransaction(response);
    } catch (error) {}
  };

  return { profitYearly, profitMountly, transaction };
};

export default analyticsHooks;
