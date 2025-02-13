import { ModalReview } from "@/components/modal/modalReview";
import { ModalUploadFile } from "@/components/modal/modalUploadFile";
import { PurchaseCard } from "@/components/purchaseCard";
import "@/css/purchasePage/purchasePage.css";
import Image from "next/image";

export default function PurchasePage() {
  return (
    <>
    
    <div className="purchase-page">
      <div className="purchase-page-title">
        <span>Purchase</span>
      </div>
      <div className="purchase-page-content">
        <div className="purchase-page-content-list">
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
              <button className="e-btn bg-info ">Upload Payment Proof</button>
              <button className="e-btn bg-secondary hidden">Review</button>
              <button className="e-btn bg-error">Cancel</button>
            </div>
          </div>
          <PurchaseCard/>
        </div>
        <div className="purchase-page-content-pagination">
          <div className="join">
            <button className="join-item btn">1</button>
            <button className="join-item btn btn-active">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
