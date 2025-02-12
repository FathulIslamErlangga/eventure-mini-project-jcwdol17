import Link from "next/link";
import "@/css/profilePage/profileEvents.css";
import { EventCard3 } from "../eventCard3";

export function ProfileEvents() {
  return (
    <div className="profile-events">
      <div className="profile-events-title">
        <div className="profile-events-title-text">
          <span>Events</span>
        </div>
        <div className="profile-events-title-btn">
          <Link href="/">
            <button className="e-btn bg-primary text-neutral">+ Add New</button>
          </Link>
        </div>
      </div>
      <div className="profile-events-content">
        <EventCard3 />
        <EventCard3 />
        <EventCard3 />
        <EventCard3 />
        <EventCard3 />
      </div>
      <div className="w-full h-fit flex justify-center items-center">
        <div className="join">
          <button className="join-item btn">1</button>
          <button className="join-item btn btn-active">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
      </div>
    </div>
  );
}
