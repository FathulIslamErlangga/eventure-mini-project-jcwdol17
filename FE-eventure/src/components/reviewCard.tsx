import Image from "next/image";
import '@/css/review.css';

export function ReviewCard() {
  return (
    <div className="review-card">
      <div className="review-card-iden">
        <div className="review-card-pic">
          <Image
            src="/assets/images/contents/events/Sample 1.jpg"
            alt="sample-1"
            width={100}
            height={100}
          />
        </div>
        <div className="review-card-text">
          <div className="review-card-name">Jane Doe</div>
          <div className="review-card-rating">
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
      <div className="review-card-comment">
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
          totam corrupti aliquid magni corporis ut assumenda illum aliquam
          voluptatibus nobis. Nam excepturi laboriosam hic mollitia cumque
          facere quia, aliquid tempore.
        </span>
      </div>
    </div>
  );
}
