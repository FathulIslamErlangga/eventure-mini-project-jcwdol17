"use client";
import Image from "next/image";
import "@/css/eventsPage/eventDetailsPage/eventContent.css";
import "@/css/eventsPage/eventCard2.css";
import "@/css/homePage/jumbotronStyle.css";
import { useState } from "react";
import { useParams } from "next/navigation";
import { IEvents } from "@/utils/interfaces/interfaces";

export function EventDetailsContent(props: IEvents) {
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
              src={`${props.gallery?.[0]?.imageUrl}`}
              alt="sample-1"
              width={1920}
              height={1080}
            />
          </div>
          <div className="eventdet-content-1-1-cov">
            <div className="cov-upper">
              <div className="event-card2-ctg">
                {props.category && props.category.name}
              </div>
              <div className="cov-ticket-left">
                <span className="text-[33px]">{props.availableSeats}</span>
                <br />
                Tickets
                <br />
                Left
              </div>
            </div>
            <div className="cov-lower">
              <div className="cov-title">{props.name}</div>
              <div className="cov-price">Rp {props.price}</div>
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
      <div className="eventdate-content-2">
        <div className="eventdate-content-2-1">
          <div className="eventdate-content-2-1-title">
            <div className="eventdate-content-2-1-title-pic">
              <Image
                src="/assets/images/icons/description.svg"
                alt="desc"
                width={60}
                height={60}
              />
            </div>
            <div className="eventdate-content-2-1-title-text">
              <span>Description</span>
            </div>
          </div>
          <div className="eventdate-content-2-1-desc">
            <span>{props.description}</span>
          </div>
        </div>
        <div className="eventdate-content-2-2">
          <div className="eventdate-content-2-2-title">
            <div className="eventdate-content-2-2-title-pic">
              <Image
                src="/assets/images/icons/location.svg"
                alt="location"
                width={60}
                height={60}
              />
            </div>
            <div className="eventdate-content-2-2-title-text">
              <span>Location</span>
            </div>
          </div>
          <div className="eventdate-content-2-2-location">
            <div className="eventdate-content-2-2-location-name">
              <span>{props.address && props.address.city}</span>
            </div>
            <div className="eventdate-content-2-2-location-address">
              <span>{props.address && props.address.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
