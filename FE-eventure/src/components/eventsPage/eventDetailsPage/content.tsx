"use client";
import Image from "next/image";
import Link from "next/link";
import "@/css/eventsPage/eventDetailsPage/eventContent.css";
import "@/css/eventsPage/eventCard2.css";
import "@/css/homePage/jumbotronStyle.css";
import { useState } from "react";
import { useParams } from "next/navigation";
import { IEvents } from "@/utils/interfaces/interfaces";
import { useRouter } from "next/navigation";
import { useLoadingNavigation } from "@/hooks/loadingNav.hook";
import { useCart } from "@/hooks/cart.hooks";
import { toast } from "react-toastify";

export function EventDetailsContent(props: IEvents) {
  const router = useRouter();
  const { handleCreateCart, isLoading } = useCart();
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count > 0 ? count - 1 : 0); // Prevent negative count
  };

  const { navigateWithLoading, LoadingWrapper } = useLoadingNavigation();
  const handleClick = (path: string) => {
    navigateWithLoading(path);
  };

  const handleAddToCart = async () => {
    if (count === 0) {
      toast.error("Please select at least one ticket");
      return;
    }

    try {
      const cartData = {
        eventId: props.id,
        ticketCount: count,
        eventName: props.name,
        price: props.price,
        totalPrice: props.price * count,
      };

      await handleCreateCart(cartData);
      toast.success("Added to cart successfully!");
      setCount(0);
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    }
  };

  return (
    <>
      <LoadingWrapper />
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

            <div
              className="btn-buy-now"
              onClick={() =>
                handleClick(`/transaction/${props.slug}?ticketCount=${count}`)
              }
            >
              <Image
                src="/assets/images/icons/dollar.svg"
                alt="buy"
                width={30}
                height={30}
              />
              <span>Buy Now</span>
            </div>

            <div
              className={`btn-add-cart ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleAddToCart}
              style={{ pointerEvents: isLoading ? "none" : "auto" }}
            >
              <Image
                src="/assets/images/icons/cart.svg"
                alt="cart"
                width={30}
                height={30}
              />
              <span>{isLoading ? "Adding..." : "Add to Cart"}</span>
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
    </>
  );
}
