'use client';
import { EventListData } from "@/components/admin/events/eventListData";
import "@/css/adminPage/eventsPage/eventsPage.css";
import Link from "next/link";
import withAuth from "@/middlewares/auth.middleware";


export default withAuth (function AdminEvent() {
  return (
    <div className="admin-events">
      <div className="admin-events-title">
        <div className="admin-events-title-text">
          <span>Events</span>
        </div>
        <div className="admin-events-title-button">
          <button className="btn btn-primary">
            <Link href="/admin/events/new-event">Add Event</Link>
          </button>
        </div>
      </div>
      <div className="admin-events-content">
        <EventListData />
      </div>
    </div>
  );
},["ORGANIZER"])
