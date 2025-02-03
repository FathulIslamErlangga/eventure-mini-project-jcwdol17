import Image from "next/image";
import '@/css/homePage/upComingEvents.css';
import '@/css/eventsPage/eventCard.css';
import { EventCard } from "../eventCard";
import { EventCard2 } from "../eventCard2";

export function UpComingEvents() {
  return (
    <div className="upcoming-events">
      <div className="ue-title">
        <div className="ue-title-text">
          <span>Upcoming Events</span>
        </div>
        {/* <div className="ue-title-btn">
          <span>See More</span>
        </div> */}
      </div>
      <div className="ue-content">
        <EventCard2/>
      </div>
      <div className="ue-content-2">
        <EventCard2/>
        <EventCard2/>
      </div>
    </div>
  );
}
