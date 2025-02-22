import Image from "next/image";
import "@/css/eoPage/eoDetailsPage/eoDetHeader.css";
import { useCart } from "@/hooks/cart.hooks";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useEvent from "@/hooks/useEvent.hooks";


export function EoDetHeader() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="eo-det-header">
      <div className="eo-det-header-iden">
        <div className="eo-det-header-pic">
          <Image
            src="/assets/images/icons/userProfile.png"
            alt="sample-1"
            width={300}
            height={300}
          />
        </div>
        <div className="eo-det-header-text">
          <span>{slug}</span>
        </div>
      </div>
      {/* <div className="eo-header-det-rating">
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
      </div> */}
    </div>
  );
}
