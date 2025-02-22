"use client";
import EventsChart from "@/components/admin/dashboard/lineChart";
import EventsChart2 from "@/components/admin/dashboard/BarChart";
import "@/css/adminPage/dashboardPage/dashboardPage.css";
import withAuth from "@/middlewares/auth.middleware";
import { ProfitTrack } from "@/components/admin/dashboard/profitTrack";

export default withAuth(
  function Dashboard() {
    return (
      <div className="dashboard">
        <div className="dashboard-title">
          <span>Welcome</span>
        </div>
        <div className="dashboard-content">
          {/* <TransactionsChart /> */}
          <ProfitTrack/>
        </div>
        <div className="dashboard-content">
          <EventsChart2 />
          <EventsChart />
        </div>
      </div>
    );
  },
  ["ORGANIZER"]
);
