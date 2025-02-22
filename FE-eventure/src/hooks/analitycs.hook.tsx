import { useState, useEffect } from "react";
import { AnalyticsService } from "@/services/analitycs.services";
import { ProfitTrackFilter } from "@/utils/interfaces/customInsterface";

export const useProfitTracking = (initialFilter?: ProfitTrackFilter) => {
  const [profit, setProfit] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfit = async (filter?: ProfitTrackFilter) => {
    try {
      setLoading(true);
      const totalProfit = await AnalyticsService.getTotalProfit(filter);
      setProfit(totalProfit);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfit(initialFilter);
  }, [JSON.stringify(initialFilter)]);

  return {
    profit,
    loading,
    error,
    refetch: fetchProfit,
  };
};
