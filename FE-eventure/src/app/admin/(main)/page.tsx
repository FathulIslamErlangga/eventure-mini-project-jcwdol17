'use client';
import TransactionsChart from '@/components/admin/dashboard/chart';
import EventsChart from '@/components/admin/dashboard/lineChart';
import '@/css/adminPage/dashboardPage/dashboardPage.css';
import withAuth from '@/middlewares/auth.middleware';

export default withAuth(function Dashboard(){
    return(
        <div className="dashboard">
            <div className="dashboard-title">
                <span>Welcome</span>
            </div>
            <div className="dashboard-content">
                <TransactionsChart/>
                <EventsChart/>
            </div>
        </div>
    )
},["ORGANIZER"])