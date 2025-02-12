import Link from "next/link";
import "@/css/profilePage/profilePromotions.css";
import { PromotionCard } from "./promotionCard";

export function ProfilePromotions() {
  return (
    <div className="profile-promotions">
      <div className="profile-promotions-title">
        <div className="profile-promotions-title-text">
          <span>Promotions</span>
        </div>
        <div className="profile-promotions-title-btn">
          <Link href="/">
            <button className="e-btn bg-primary text-neutral">+ Add New</button>
          </Link>
        </div>
      </div>
      <div className="profile-promotions-content">
        <PromotionCard/>
        <PromotionCard/>
        <PromotionCard/>
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
