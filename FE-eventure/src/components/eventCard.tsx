import Image from "next/image";
import '@/css/eventsPage/eventCard.css';

export function EventCard(){
    return(
        <div className="event-card">
        <div className="event-card-pic">
          <Image
            src="/assets/images/contents/events/Sample 1.jpg"
            alt="sample-1"
            width={150}
            height={300}
          />
        </div>
        <div className="event-card-cov">
          <div className="event-card-cov-up">
            <div className="event-card-ctg">Music & Concert</div>
            <div className="event-card-date">23 Jan 25</div>
          </div>
          <div className="event-card-cov-down">
            <div className="event-card-cov-down-1">
              <div className="event-card-title">Concert Event</div>
              <div className="event-card-price">Rp 1.000.000</div>
            </div>
            <div className="event-card-cov-down-2">
              <div className="event-card-btn cart-btn">
                <Image
                  src="/assets/images/icons/cart.svg"
                  alt="cart"
                  width={30}
                  height={30}
                />
              </div>
              <div className="event-card-btn buy-btn">
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
    )
}