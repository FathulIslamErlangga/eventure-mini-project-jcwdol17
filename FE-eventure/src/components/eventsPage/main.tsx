import Image from "next/image";
import '@/css/eventsPage/eventsPage.css';
import '@/css/homePage/categoriesStyle.css';
import { EventCard2 } from "../eventCard2";

export function EventsPage() {
  return (
    <div className="events-page">
      <div className="events-title">
        <div className="events-title-text">Events</div>
        <div className="events-pic">
            <Image
              src="/assets/images/contents/events/Star 12.svg"
              alt="star-12"
              width={100}
              height={100}
            />
        </div>
      </div>
      <div className="events-content">
        <div className="events-content-1">
            <EventCard2/>
            <EventCard2/>
            <EventCard2/>
            <EventCard2/>
            <EventCard2/>
            <EventCard2/>
            <EventCard2/>
            <EventCard2/>
        </div>
        <div className="events-pagination">
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
