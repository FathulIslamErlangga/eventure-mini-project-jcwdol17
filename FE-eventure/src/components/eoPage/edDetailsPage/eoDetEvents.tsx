import { EventCard2 } from "@/components/eventCard2";
import Image from "next/image";
import "@/css/eoPage/eoDetailsPage/eoDetEvents.css";

export function EoDetEvents() {
  return (
    <div className="eo-det-events">
      <div className="eo-det-events-title">
        <div className="eo-det-events-title-text">
          <span>Events</span>
        </div>
        <div className="eo-det-events-title-pic">
          <Image
            src="/assets/images/contents/events/Star 12.svg"
            alt="star 12"
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className="eo-det-events-content">
        <div className="eo-det-events-content-1">
          <EventCard2 />
          <EventCard2 />
          <EventCard2 />
          <EventCard2 />
          <EventCard2 />
          <EventCard2 />
          <EventCard2 />
          <EventCard2 />
        </div>
        <div className="eo-det-events-pagination">
          <div className="join">
            <button className="join-item btn">1</button>
            <button className="join-item btn btn-active">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
          </div>
        </div>
      </div>
    </div>
  );
}
