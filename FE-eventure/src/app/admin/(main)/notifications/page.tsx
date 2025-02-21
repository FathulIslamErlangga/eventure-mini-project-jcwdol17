'use client';
import { NotifCard } from "@/components/notifPage/notifCard";
import '@/css/adminPage/notificationPage/notificationPage.css'
import withAuth from "@/middlewares/auth.middleware";

export default withAuth (function AdminNotification(){
    return (
        <div className="admin-notifications">
            <div className="admin-notifications-title">
                <span>Notifications</span>
            </div>
            <div className="admin-notifications-content">
                <NotifCard/>
                <NotifCard/>
                <NotifCard/>
            </div>
        </div>
    )
},["ORGANIZER"])