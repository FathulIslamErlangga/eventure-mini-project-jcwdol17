import Image from "next/image";
import Link from "next/link";
import "@/css/eoPage/eoCard.css";

export function EoCard() {
  return (
    <>
      <Link href="/eo/id">
        <div className="eo-card">
          <div className="eo-card-pic">
            <Image
              src="/assets/images/contents/eo/Sample 1.jpg"
              alt="sample-1"
              width={300}
              height={300}
            />
          </div>
          <div className="eo-card-identity">
            <div className="eo-card-name">
                <span>Disuka EO</span>
            </div>
            <div className="eo-card-rating">
              <div className="eo-card-rating-num">4</div>
              <div className="eo-card-rating-star">
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
    </>
  );
}
