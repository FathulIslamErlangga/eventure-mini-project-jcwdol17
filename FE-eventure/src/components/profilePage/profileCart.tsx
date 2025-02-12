import Image from "next/image";
import { CartCard } from "../cartPage/cartCard";
import "@/css/profilePage/profileCart.css";
import Link from "next/link";

export function ProfileCart() {
  return (
    <div className="profile-cart">
      <div className="profile-cart-title">
        <div className="profile-cart-title-text">
          <span>Cart</span>
        </div>
        <div className="profile-cart-title-btn">
          <Link href="/cart">
            <button className="e-btn bg-primary text-neutral">See More</button>
          </Link>
        </div>
      </div>
      <div className="profile-cart-content">
        <CartCard />
        <CartCard />
        <CartCard />
      </div>
    </div>
  );
}
