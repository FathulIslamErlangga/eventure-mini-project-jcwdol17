import { EventListData } from "@/components/admin/events/eventListData";
import '@/css/adminPage/eventsPage/eventsPage.css';

export default function AdminEvent() {
  return (
    <div className="admin-events">
      <div className="admin-events-title">
        <div className="admin-events-title-text">
          <span>Events</span>
        </div>
        <div className="admin-events-title-button">
          <button className="btn btn-primary">Add Event</button>
        </div>
      </div>
      <div className="admin-events-content">
        <EventListData/>
      </div>
    </div>
  );
}
