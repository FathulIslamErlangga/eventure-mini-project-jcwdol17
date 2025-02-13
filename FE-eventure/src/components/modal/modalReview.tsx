"use client";
import Image from "next/image";
import "@/css/modal.css";
import { useState } from "react";

interface ModalReviewProps {
  onClose: () => void;
}

export function ModalReview({ onClose }: ModalReviewProps) {
  return (
    <div className="emodal3">
      <div className="emodal2-content">
        <div className="emodal-close">
          <div className="emodal-btn-close" onClick={onClose}>
            <Image
              src="/assets/images/icons/close.svg"
              alt="close"
              width={15}
              height={15}
            />
          </div>
        </div>
        <div className="emodal-title">
          <span>Review</span>
        </div>
        <form className="eventure-form gap-8" action="">
          <div className="w-full h-fit flex items-center justify-center">
            <div className="rating rating-lg">
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
                defaultChecked
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          </div>
          <textarea
            className="border-[2.5px] border-[#04002D] textarea textarea-bordered"
            placeholder="Event Description"
          ></textarea>

          <button className="eventure-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
