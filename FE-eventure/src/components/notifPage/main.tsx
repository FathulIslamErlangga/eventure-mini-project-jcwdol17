import Image from "next/image";
import "@/css/notifPage/notifPage.css";
import { NotifCard } from "./notifCard";

export function NotifPage() {
  return (
    <div className="notif-page">
      <div className="notif-page-title">
        <div className="notif-page-title-text">
          <span>Notifications</span>
        </div>
        <div className="notif-page-title-pic">
          <Image
            src="/assets/images/icons/Rectangle Neo.svg"
            alt="rectangle"
            width={243}
            height={127}
          />
        </div>
      </div>
      <div className="notif-page-content">
        <NotifCard />
        <NotifCard />
        <NotifCard />
      </div>
        <div className="w-full h-fit flex items-center justify-center">
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
