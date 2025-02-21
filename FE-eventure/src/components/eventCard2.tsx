import Image from "next/image";
import "@/css/eventsPage/eventCard2.css";
import Link from "next/link";
import useEvent from "@/hooks/useEvent.hooks";
import { IEvents } from "@/utils/interfaces/interfaces";
import { useLoadingNavigation } from "@/hooks/loadingNav.hook";
import { useCart } from "@/hooks/cart.hooks";
import { toast } from "react-toastify";

export function EventCard2(props: IEvents) {
  const { navigateWithLoading, LoadingWrapper } = useLoadingNavigation();
  const { handleCreateCart, isLoading } = useCart();

  const handleClick = (path: string) => {
    navigateWithLoading(path);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from triggering navigation

    try {
      const cartData = {
        eventId: props.id,
        ticketCount: 1,
        eventName: props.name,
        price: props.price,
        totalPrice: props.price,
      };

      await handleCreateCart(cartData);
      toast.success(`1 ticket for ${props.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add ticket to cart");
      console.error(error);
    }
  };

  return (
    <>
      <LoadingWrapper />

      <div
        className="event-card2"
        onClick={() => handleClick(`/events/${props.slug}`)}
      >
        <div className="event-card2-pic">
          <Image
            src={
              props.gallery?.[0]?.imageUrl ||
              "/assets/images/contents/events/Sample 1.jpg"
            }
            alt={props.name}
            width={150}
            height={300}
          />
        </div>
        <div className="event-card2-cov">
          <div className="event-card2-cov-up">
            <div className="event-card2-ctg">
              {props.category && props.category.name}
            </div>
            <div className="event-card2-date">
              {new Date(props.startDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </div>
          </div>
          <div className="event-card2-cov-mid">
            <div className="event-card2-title">{props.name}</div>
          </div>
          <div className="event-card2-cov-down">
            <div className="event-card2-cov-down-1">
              <div className="event-card2-price">
                {" "}
                Rp {props.price?.toLocaleString()}
              </div>
            </div>
            <div className="event-card2-cov-down-2">
              <div
                className={`event-card2-btn cart-btn ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleAddToCart}
                style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
              >
                <Image
                  src="/assets/images/icons/cart.svg"
                  alt="cart"
                  width={30}
                  height={30}
                />
              </div>
              <div
                className="event-card2-btn buy-btn"
                onClick={() => handleClick(`/events/${props.slug}`)}
              >
                <Link href={`/events/${props.slug}`}>
                  <Image
                    src="/assets/images/icons/dollar.svg"
                    alt="buy"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
