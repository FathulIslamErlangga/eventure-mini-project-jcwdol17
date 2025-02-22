"use client";
import "@/css/notifPage/notifCard.css";
import { useAuth } from "../contexts/AuthContexts";
import { format } from "date-fns";

export function NotifCard() {
  const { notifications } = useAuth();

  return (
    <>
      {notifications.notification?.data.map((_) => (
        <div className="notif-card">
          <div className="notif-card-date">
            <span>{format(new Date(_.createdAt), "dd MMMM yyyy")}</span>
          </div>
          <div className="notif-card-title">
            <span>{_.title}</span>
          </div>
          <div className="notif-card-message">
            <span>{_.message}</span>
          </div>
        </div>
      ))}
    </>
  );
}
