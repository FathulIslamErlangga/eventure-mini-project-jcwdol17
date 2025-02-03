import Image from "next/image";
import Link from "next/link";
import "@/css/eventsPage/eventDetailsPage/eventDetHeader.css";

export function EDPHeader() {
  return (
    <div className="ed-header">
      <Link href="/eo/id">
        <div className="ed-header-eo">
          <div className="ed-header-eo-pic">
            <Image
              src="/assets/images/contents/eo/Sample 1.jpg"
              alt="sample-1"
              width={300}
              height={300}
            />
          </div>
          <div className="ed-header-eo-iden">
            <div className="ed-header-eo-iden-name">
              <span>Disuka EO</span>
            </div>
            <div className="ed-header-eo-iden-rating">
              <div className="ed-header-eo-iden-rating-num">
                <span>4</span>
              </div>
              <div className="ed-header-eo-iden-rating-star">
                <Image
                  src="/assets/images/contents/eo/Star 11.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
                <Image
                  src="/assets/images/contents/eo/Star 11.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
                <Image
                  src="/assets/images/contents/eo/Star 11.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
                <Image
                  src="/assets/images/contents/eo/Star 11.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
                <Image
                  src="/assets/images/contents/eo/Star 12.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="ed-header-held">
        <div className="ed-header-held-dt">
          <div className="ed-header-held-dt-img">
            <Image
              src="/assets/images/icons/start-date.svg"
              alt="start-date"
              width={80}
              height={80}
            />
          </div>
          <div className="ed-header-held-dt-text">
            <div className="ed-header-held-dt-text-1">Start Date</div>
            <div className="ed-header-held-dt-text-2">25-01-2025</div>
          </div>
        </div>
        <div className="ed-header-held-dt">
          <div className="ed-header-held-dt-img">
            <Image
              src="/assets/images/icons/end-date.svg"
              alt="end-date"
              width={80}
              height={80}
            />
          </div>
          <div className="ed-header-held-dt-text">
            <div className="ed-header-held-dt-text-1">End Date</div>
            <div className="ed-header-held-dt-text-2">25-01-2025</div>
          </div>
        </div>
        <div className="ed-header-held-dt">
          <div className="ed-header-held-dt-img">
            <Image
              src="/assets/images/icons/time.svg"
              alt="time"
              width={80}
              height={80}
            />
          </div>
          <div className="ed-header-held-dt-text">
            <div className="ed-header-held-dt-text-1">Time</div>
            <div className="ed-header-held-dt-text-2">10:00 AM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
