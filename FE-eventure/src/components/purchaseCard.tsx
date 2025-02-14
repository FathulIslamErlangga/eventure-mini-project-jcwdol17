"use client";
import Image from "next/image";
import "@/css/purchasePage/purchaseCard.css";
import { useState } from "react";
import { ModalUploadFile } from "./modal/modalUploadFile";
import { ModalReview } from "./modal/modalReview";

export function PurchaseCard() {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const handleUploadModalClick = () => {
    setUploadModalOpen(true);
  };

  const handleReviewModalClick = () => {
    setReviewModalOpen(true);
  };

  return (
    <div className="purchase-card">
      <div className="purchase-card-pic">
        <Image
          src="/assets/images/contents/events/Sample 1.jpg"
          alt="sample-1"
          width={200}
          height={200}
        />
      </div>
      <div className="purchase-card-info">
        <div className="purchase-card-info-title">
          <span>Blackpink Comeback</span>
        </div>
        <div className="list-divided">
          <div className="purchase-card-info-ctg">
            <span>Concert & Music</span>
          </div>
          <div className="purchase-card-info-date">
            <span>Date : 01/01/2024</span>
          </div>
        </div>
        <div className="list-divided">
          <div className="purchase-card-info-price">
            <span>Total : Rp. 100.000</span>
          </div>
          <div className="purchase-card-info-qty">
            <span>Qty : 1</span>
          </div>
        </div>
      </div>
      <div className="purchase-card-status">
        <span>Waiting for Payment</span>
      </div>
      <div className="purchase-card-action">
        <button onClick={handleUploadModalClick} className="e-btn bg-info ">
          Upload Payment Proof
        </button>
        {isUploadModalOpen && (
          <ModalUploadFile onClose={() => setUploadModalOpen(false)} />
        )}{" "}
        <button onClick={handleReviewModalClick} className="e-btn bg-secondary">
          Review
        </button>
        {isReviewModalOpen && (
          <ModalReview onClose={() => setReviewModalOpen(false)} />
        )}
        <button className="e-btn bg-error">Cancel</button>
      </div>
    </div>
  );
}
