"use client";
import Image from "next/image";
import "@/css/purchasePage/purchaseCard.css";
import { useState } from "react";
import { ModalUploadFile } from "./modal/modalUploadFile";
import { ModalReview } from "./modal/modalReview";
import { ITransactions } from "@/utils/interfaces/interfaces";

export function PurchaseCard(props: ITransactions) {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [uploadModalQueryParam, setUploadModalQueryParam] = useState("");
  const [statusModalQueryParam, setStatusModalQueryParam] = useState("");

  const handleUploadModalClick = (id: string, status: string) => {
    const queryParam = `${id}`;
    const statusParam = `${status}`;
    setUploadModalQueryParam(queryParam);
    setStatusModalQueryParam(statusParam);
    setUploadModalOpen(true);
  };

  const handleReviewModalClick = () => {
    setReviewModalOpen(true);
  };

  return (
    <div className="purchase-card">
      <div className="purchase-card-pic">
        <Image
          src={props.event.gallery[0].imageUrl}
          alt="sample-1"
          width={200}
          height={200}
        />
      </div>
      <div className="purchase-card-info">
        <div className="purchase-card-info-title">
          <span>{props.event.name}</span>
        </div>
        <div className="list-divided">
          <div className="purchase-card-info-ctg">
            <span>{props.event?.category?.name}</span>
          </div>
          <div className="purchase-card-info-date">
            <span>
              {new Date(props.event?.startDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </span>
          </div>
        </div>
        <div className="list-divided">
          <div className="purchase-card-info-price">
            <span>Total : Rp. {props.totalPrice}</span>
          </div>
          <div className="purchase-card-info-qty">
            <span>Qty : {props.ticketQuantity}</span>
          </div>
        </div>
      </div>
      <div className="purchase-card-status">
        <span>{props.status}</span>
      </div>
      <div className="purchase-card-action">
        <button
          onClick={() => handleUploadModalClick(props.id, props.status)}
          className="e-btn bg-info "
        >
          Upload Payment Proof
        </button>
        {isUploadModalOpen && (
          <ModalUploadFile
            onClose={() => setUploadModalOpen(false)}
            queryParam={uploadModalQueryParam}
            status={statusModalQueryParam}
          />
        )}
        {props.event?.attendees?.[0]?.checkedIn == true && (
          <button
            onClick={handleReviewModalClick}
            className="e-btn bg-secondary"
          >
            Review
          </button>
        )}
        {isReviewModalOpen && (
          <ModalReview onClose={() => setReviewModalOpen(false)} />
        )}
        {props.status != "DONE" && (
          <button className="e-btn bg-error">Cancel</button>
        )}
      </div>
    </div>
  );
}
