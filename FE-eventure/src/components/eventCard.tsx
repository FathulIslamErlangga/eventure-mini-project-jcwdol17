import Image from "next/image";
import '@/css/eventsPage/eventCard.css';
import { IEvents } from "@/utils/interfaces/interfaces";
import Link from 'next/link';

export function EventCard(props : IEvents){
    return(
        <div className="event-card">
        <div className="event-card-pic">
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
        <div className="event-card-cov">
          <div className="event-card-cov-up">
            <div className="event-card-ctg"> {props.category && props.category.name}</div>
            <div className="event-card-date">{new Date(props.startDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })}</div>
          </div>
          <div className="event-card-cov-down">
            <div className="event-card-cov-down-1">
              <div className="event-card-title">{props.name}</div>
              <div className="event-card-price"> {" "}
              Rp {props.price?.toLocaleString()}  </div>
            </div>
            <div className="event-card-cov-down-2">
              <div className="event-card-btn cart-btn">
              <Link href={`/events/${props.slug}`}>
                <Image
                  src="/assets/images/icons/cart.svg"
                  alt="cart"
                  width={30}
                  height={30}
                />
              </Link>
              </div>
              <div className="event-card-btn buy-btn">
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
    )
}