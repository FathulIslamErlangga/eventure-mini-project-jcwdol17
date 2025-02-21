import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "@/css/adminPage/dashboardPage/eventsChart.css";
import eventsHooks from "@/hooks/events.hooks";
import { useMemo } from "react";

export default function EventsChart() {
  const { getevent } = eventsHooks();

  const monthlyEventCounts = useMemo(() => {
    if (!getevent?.data) return [];

    // Initialize an array with 12 zeros for each month
    const monthCounts = new Array(12).fill(0);

    // Count events for each month
    getevent.data.forEach((event) => {
      const eventDate = new Date(event.startDate);
      const monthIndex = eventDate.getMonth(); // 0-11
      monthCounts[monthIndex]++;
    });

    return monthCounts;
  }, [getevent]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="events-chart">
      <div className="events-chart-title">
        <span>Events per Month</span>
      </div>
      <div className="events-chart-content">
        <LineChart
          xAxis={[
            {
              data: months,
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: monthlyEventCounts,
              label: "Number of Events",
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}
