import Image from "next/image";
import "@/css/eventsPage/eventCard2.css";
import Link from "next/link";
import useEvent from "@/hooks/useEvent.hooks";
import { IEvents } from "@/utils/interfaces/interfaces";

export function EventCard2(props: IEvents & { category?: { name: string } }) {
  return (
    <>
      <Link href={`/events/${props.slug}`}>
        <div className="event-card2">
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
                {props.category?.name || "Uncategorized"}
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
                <div className="event-card2-price"> Rp {props.price}</div>
              </div>
              <div className="event-card2-cov-down-2">
                <div className="event-card2-btn cart-btn">
                  <Image
                    src="/assets/images/icons/cart.svg"
                    alt="cart"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="event-card2-btn buy-btn">
                  <Image
                    src="/assets/images/icons/dollar.svg"
                    alt="buy"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
