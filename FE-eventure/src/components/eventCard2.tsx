import Image from "next/image";
import "@/css/eventsPage/eventCard2.css";
import Link from "next/link";

export function EventCard2() {
  return (
    <>
      <Link href="/events/id">
        <div className="event-card2">
          <div className="event-card2-pic">
            <Image
              src="/assets/images/contents/events/Sample 1.jpg"
              alt="sample-1"
              width={150}
              height={300}
            />
          </div>
          <div className="event-card2-cov">
            <div className="event-card2-cov-up">
              <div className="event-card2-ctg">Music & Concert</div>
              <div className="event-card2-date">23 Jan 25</div>
            </div>
            <div className="event-card2-cov-mid">
              <div className="event-card2-title">Concert Event</div>
            </div>
            <div className="event-card2-cov-down">
              <div className="event-card2-cov-down-1">
                <div className="event-card2-price">Rp 1.000.000</div>
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
