import Image from "next/image";
import '@/css/eoPage/eoDetailsPage/eoDetHeader.css';

export function EoDetHeader() {
  return (
    <div className="eo-det-header">
      <div className="eo-det-header-iden">
        <div className="eo-det-header-pic">
          <Image
            src="/assets/images/contents/eo/Sample 1.jpg"
            alt="sample-1"
            width={300}
            height={300}
          />
        </div>
        <div className="eo-det-header-text">
          <span>Disuka EO</span>
        </div>
      </div>
      <div className="eo-header-det-rating">
        <Image
          src="/assets/images/contents/eo/Star 11.svg"
          alt="star"
          width={50}
          height={50}
        />
        <Image
          src="/assets/images/contents/eo/Star 11.svg"
          alt="star"
          width={50}
          height={50}
        />
        <Image
          src="/assets/images/contents/eo/Star 11.svg"
          alt="star"
          width={50}
          height={50}
        />
        <Image
          src="/assets/images/contents/eo/Star 11.svg"
          alt="star"
          width={50}
          height={50}
        />
        <Image
          src="/assets/images/contents/eo/Star 12.svg"
          alt="star"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
