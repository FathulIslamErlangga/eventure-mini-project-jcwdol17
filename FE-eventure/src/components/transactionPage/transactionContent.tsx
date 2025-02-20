"use client";
import Image from "next/image";
import { useState } from "react";
import "@/css/transactionPage/transactionContent.css";

export function TransactionContent() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count > 0 ? count - 1 : 0); // Prevent negative count
  };

  return (
    <div className="transaction-content">
      <div className="transaction-item">
        <div className="w-full h-fit flex flex-col md:flex-col lg:flex-row gap-2 items-center">
          <div className="transaction-item-pic">
            <Image
              src="/assets/images/contents/events/Sample 1.jpg"
              alt="sample-1"
              width={200}
              height={200}
            />
          </div>
          <div className="transaction-item-info">
            <div className="transaction-item-info-title">
              <span>Blackpink Comeback</span>
            </div>
            <div className="transaction-item-info-price">
              <span>Rp. 100.000</span>
            </div>
            <div className="list-divided">
              <div className="transaction-item-info-ctg">
                <span>Concert & Music</span>
              </div>
              <div className="transaction-item-info-date">
                <span>Date : 01/01/2024</span>
              </div>
            </div>
          </div>
        </div>
        <div className="transaction-item-action">
          <div className="e-btn bg-error p-3" onClick={decrement}>
            <Image
              src="/assets/images/icons/minus.svg"
              alt="minus"
              width={30}
              height={30}
            />
          </div>
          <div className="text-[#04002D] text-[18px]">
            <span>{count}</span>
          </div>
          <div className="e-btn bg-success p-3" onClick={increment}>
            <Image
              src="/assets/images/icons/plus.svg"
              alt="plus"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-fit gap-3 flex flex-col md:flex-col lg:flex-row">
        <div className="transaction-method">
          <div className="transaction-method-title">
            <span>Payment Method</span>
          </div>
          <div className="transaction-method-content">
            <div className="transaction-method-card">
              <label className="label cursor-pointer gap-8">
                <input
                  type="checkbox"
                  defaultChecked
                  disabled
                  className="checkbox checkbox-primary"
                />
                <div className="w-full h-fit flex gap-4 items-center">
                  <Image
                    src="/assets/images/icons/file-invoice.svg"
                    alt="transfer-bank"
                    width={20}
                    height={20}
                  />
                  <span className="label-text">Pay with Transfer Bank</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="transaction-promotion">
          <div className="transaction-promotion-title">
            <span>Promotion</span>
          </div>
          <div className="transaction-promotion-content">
            <form className="eventure-form" action="">
              <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
                Point
                <input
                  type="number"
                  className="grow"
                  placeholder="10000"
                />
              </label>
              <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
                Code
                <input
                  type="text"
                  className="grow"
                  placeholder="Promotion Code"
                />
              </label>
              <button className="eventure-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="transaction-summary">
        <div className="transaction-summary-title">
          <span>Summary</span>
        </div>
        <div className="transaction-summary-content">
          <div className="transaction-summary-item">
            <span className="summary-item-title">Subtotal</span>
            <span>Rp. 100.000</span>
          </div>
          <div className="transaction-summary-item">
            <span className="summary-item-title">Qty</span>
            <span>{count}</span>
          </div>
          <div className="transaction-summary-item">
            <span className="summary-item-title">Discount</span>
            <span>Rp. 10.000</span>
          </div>
          <div className="divider"></div>
          <div className="transaction-summary-item text-[24px]">
            <span className="summary-item-total">Total</span>
            <span>Rp. 90.000</span>
          </div>
          <div className="transaction-btn-co">
            <span>Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
