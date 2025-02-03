import "@/css/homePage/moreEvent.css";
import { EventCard2 } from "../eventCard2";

export function MoreEvent() {
  return (
    <div className="moreEvent">
      <div className="moreEvent-title">
        <div className="moreEvent-title-text">
          <span>More Event</span>
        </div>
        <div className="moreEvent-title-btn">
          <span>See More</span>
        </div>
      </div>
      <div className="moreEvent-content">
        <EventCard2 />
        <EventCard2 />
        <EventCard2 />
        <EventCard2 />
      </div>
    </div>
  );
}
