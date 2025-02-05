import Image from "next/image";
import "@/css/review.css";
import { ReviewCard } from "./reviewCard";

export function Review() {
  return (
    <div className="review">
      <div className="review-title">
        <div className="review-title">
          <div className="review-title-pic">
            <Image
              src="/assets/images/contents/eo/Star 11.svg"
              alt="star"
              width={100}
              height={100}
            />
          </div>
          <div className="review-title-text">
            <span>Reviews</span>
          </div>
        </div>
      </div>
      <div className="review-content">
        <ReviewCard />
      </div>
    </div>
  );
}
