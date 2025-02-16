import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import '@/css/adminPage/dashboardPage/transactionsChart.css'

export default function TransactionsChart() {
  return (
    <div className="transactions-chart">
      <div className="transactions-chart-title">
        <span>Transactions</span>
      </div>
      <div className="transactions-chart-content">
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: ["bar A", "bar B", "bar C"],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: [2, 5, 3],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}
