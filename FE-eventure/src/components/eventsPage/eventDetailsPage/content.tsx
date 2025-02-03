"use client";
import Image from "next/image";
import "@/css/eventsPage/eventDetailsPage/eventContent.css";
import "@/css/eventsPage/eventCard2.css";
import "@/css/homePage/jumbotronStyle.css";
import { useState } from "react";

export function EventDetailsContent() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count > 0 ? count - 1 : 0); // Prevent negative count
  };

  return (
    <div className="event-details-content">
      <div className="eventdet-content-1">
        <div className="eventdet-content-1-1">
          <div className="eventdet-content-1-1-img">
            <Image
              src="/assets/images/contents/events/Sample 1.jpg"
              alt="sample-1"
              width={1920}
              height={1080}
            />
          </div>
          <div className="eventdet-content-1-1-cov">
            <div className="cov-upper">
              <div className="event-card2-ctg">Concert & Music</div>
              <div className="cov-ticket-left">
                <span className="text-[33px]">15</span>
                <br />
                Tickets
                <br />
                Left
              </div>
            </div>
            <div className="cov-lower">
              <div className="cov-title">Blackpink Comeback</div>
              <div className="cov-price">Rp 1.000.000</div>
            </div>
          </div>
        </div>
        <div className="eventdet-content-1-2">
          <div className="event-counter">
            <div className="btn-counter-sub" onClick={decrement}>
              -
            </div>
            <div className="event-counter-text">
              <span>{count}</span>
            </div>
            <div className="btn-counter-add" onClick={increment}>
              +
            </div>
          </div>
          <div className="btn-buy-now">
            <Image
              src="/assets/images/icons/dollar.svg"
              alt="buy"
              width={30}
              height={30}
            />
            <span>Buy Now</span>
          </div>
          <div className="btn-add-cart">
            <Image
              src="/assets/images/icons/cart.svg"
              alt="cart"
              width={30}
              height={30}
            />
            <span>Add to Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}
