import TransactionsChart from '@/components/admin/dashboard/chart';
import EventsChart from '@/components/admin/dashboard/lineChart';
import '@/css/adminPage/dashboardPage/dashboardPage.css';

export default function Dashboard(){
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
}