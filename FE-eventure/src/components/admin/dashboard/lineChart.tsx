import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import '@/css/adminPage/dashboardPage/eventsChart.css';

export default function EventsChart() {
  return (
    <div className="events-chart">
      <div className="events-chart-title">
        <span>Events</span>
      </div>
      <div className="events-chart-content">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}
