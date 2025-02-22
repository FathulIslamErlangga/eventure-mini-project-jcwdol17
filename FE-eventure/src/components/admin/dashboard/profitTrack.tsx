"use client";
import React, { useState, useMemo } from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { useProfitTracking } from "@/hooks/analitycs.hook";
import { ProfitTrackFilter } from "@/utils/interfaces/customInsterface";
import "@/css/adminPage/dashboardPage/transactionsChart.css";

export function ProfitTrack() {
  const [filter, setFilter] = useState<ProfitTrackFilter>({ range: "daily" });
  const { profit, loading, error, refetch } = useProfitTracking(filter);

  // Dynamic chart data based on filter
  const { chartData, xLabels } = useMemo(() => {
    switch (filter.range) {
      case "daily":
        return {
          chartData: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
          xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        };
      case "weekly":
        return {
          chartData: [5000, 4500, 6000, 5500, 7000, 6500, 8000],
          xLabels: [
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4",
            "Week 5",
            "Week 6",
            "Week 7",
          ],
        };
      case "monthly":
        return {
          chartData: [10000, 12000, 9000, 15000, 11000, 13000, 14000],
          xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        };
      case "yearly":
        return {
          chartData: [50000, 60000, 55000, 70000, 65000, 75000, 80000],
          xLabels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
        };
      case "custom":
        return {
          chartData: [
            filter.startDate
              ? parseInt(filter.startDate.split("-")[1]) * 1000
              : 5000,
            filter.endDate
              ? parseInt(filter.endDate.split("-")[1]) * 1000
              : 6000,
          ],
          xLabels: [filter.startDate || "Start", filter.endDate || "End"],
        };
      default:
        return {
          chartData: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
          xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        };
    }
  }, [filter]);

  const handleFilterChange = (newFilter: ProfitTrackFilter) => {
    setFilter(newFilter);
    refetch(newFilter);
  };

  if (loading) return <div>Loading profit data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="transactions-chart">
      <div className="transactions-chart-title">
        <span>Profit Tracking</span>
      </div>
      <div className="transactions-chart-title">
        <span>
          Total Profit:{" "}
          {Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(profit)}
        </span>
      </div>
      <div className="transactions-chart-content">
        <div className="filter-section flex gap-4">
          <div>
            <label className="label">
              <span className="label-text">Filter by</span>
            </label>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={filter.range}
              onChange={(e) =>
                handleFilterChange({
                  range: e.target.value as ProfitTrackFilter["range"],
                })
              }
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {filter.range === "custom" && (
            <div className="flex items-center gap-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Start Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-sm w-full max-w-xs"
                  value={filter.startDate || ""}
                  onChange={(e) =>
                    handleFilterChange({ ...filter, startDate: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">End Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-sm w-full max-w-xs"
                  value={filter.endDate || ""}
                  onChange={(e) =>
                    handleFilterChange({ ...filter, endDate: e.target.value })
                  }
                />
              </div>
            </div>
          )}
        </div>
        <LineChart
          width={1100}
          height={300}
          series={[
            {
              data: chartData,
              label: filter.range,
              area: true,
              showMark: false,
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: xLabels,
            },
          ]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              display: "none",
            },
          }}
        />
      </div>
    </div>
  );
}
