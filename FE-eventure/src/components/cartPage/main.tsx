import Image from "next/image";
import "@/css/cartPage/cart.css";
import { CartCard } from "./cartCard";

export function Cart() {
  return (
    <div className="cart-page">
      <div className="cart-page-title">
        <div className="cart-page-title-text">
          <span>Cart</span>
        </div>
        <div className="cart-page-title-pic">
          <Image
            src="/assets/images/icons/Star Neo.svg"
            alt="Neo Star"
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className="cart-page-content">
        <CartCard />
        <CartCard />
        <CartCard />
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
