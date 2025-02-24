"use client";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import "@/css/transactionPage/transactionContent.css";
import { useSearchParams, useParams } from "next/navigation";
import useEvent from "@/hooks/useEvent.hooks";
import {
  eventsResponse,
  transactionResponse,
} from "@/utils/interfaces/customInsterface";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS fo
import { ToastContainer } from "react-toastify";
import { CookieValueTypes } from "cookies-next";
import { getCookie } from "cookies-next";
import api from "@/utils/api/axios";
import transactionsHooks from "@/hooks/transactions.hooks";
import { useRouter } from "next/navigation";
import { useLoadingNavigation } from "@/hooks/loadingNav.hook";

export function TransactionContent() {
  const searchParams = useSearchParams(); // Get search parameters
  const ticketCount = searchParams.get("ticketCount"); // Access ticketCount
  const [count, setCount] = useState(Number(ticketCount) || 0);
  const params = useParams();
  const slug = params.slug as string;

  const { events } = useEvent();
  const { getEventBySlug, error } = events;

  const [event, setEvent] = useState<eventsResponse | null>(null);
  const [codeVoucher, setCodeVoucher] = useState(""); // For voucher code input
  const [referralPointsUsed, setReferralPointsUsed] = useState(0); // For referral points
  const { createTransactionData } = transactionsHooks();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      const fetchEvent = async () => {
        const fetchedEvent = await getEventBySlug(slug);
        setEvent(fetchedEvent);
      };
      fetchEvent();
    }
  }, [slug]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count > 0 ? count - 1 : 0); // Prevent negative count
  };

  const price = event?.data?.price || 0;
  const subtotal = price * count;
  const discount = 0;
  const total = subtotal - discount;
  const { navigateWithLoading, LoadingWrapper } = useLoadingNavigation();

  const handleCreateTransaction = async () => {
    setLoading(true); // Start loading
    try {
      const response = (await createTransactionData({
        eventId: event?.data?.id as string,
        ticketQuantity: count,
        codeVoucher: codeVoucher,
        referralPointsUsed: referralPointsUsed,
      })) as transactionResponse; // Ensure you cast to the correct type

      console.log("Event ID:", event?.data?.id);
      console.log("Ticket Quantity:", count);
      console.log("Response from createTransactionService:", response);

      if (response && response.data) {
        const paymentToken = response.data; // Ensure this is the correct property
        console.log("Payment Token:", paymentToken); // Log the payment token

        if (!paymentToken) {
          throw new Error("Payment token is missing from the response.");
        }

        toast.success("Transaction created successfully!");
        navigateWithLoading('/purchase');
      } else {
        console.error("Error during checkout: snap.js is not loaded");
        toast.error("Error during checkout: snap.js is not loaded");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Transaction creation failed:", error.message);
        toast.error("Transaction creation failed: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        toast.error("Transaction creation failed: Unknown error");
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <LoadingWrapper />
      <div className="transaction-content">
        <div className="transaction-item">
          <div className="w-full h-fit flex flex-col md:flex-col lg:flex-row gap-2 items-center">
            <div className="transaction-item-pic">
              <Image
                src={
                  event?.data?.gallery?.[0].imageUrl ||
                  "/assets/images/sample-1.png"
                }
                alt="sample-1"
                width={200}
                height={200}
              />
            </div>
            <div className="transaction-item-info">
              <div className="transaction-item-info-title">
                <span>{event?.data?.name}</span>
              </div>
              <div className="transaction-item-info-price">
                <span>Rp. {event?.data?.price}</span>
              </div>
              <div className="list-divided">
                <div className="transaction-item-info-ctg">
                  <span>{event?.data?.category?.name}</span>
                </div>
                <div className="transaction-item-info-date">
                  <span>
                    {event?.data?.startDate
                      ? new Date(event.data.startDate)
                          .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .split("/")
                          .join("-")
                      : "N/A"}
                  </span>
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
                  <input type="number" className="grow" placeholder="10000" />
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
              <span>Rp. {event?.data?.price}</span>
            </div>
            <div className="transaction-summary-item">
              <span className="summary-item-title">Qty</span>
              <span>{count}</span>
            </div>
            <div className="transaction-summary-item">
              <span className="summary-item-title">Discount</span>
              <span>Rp. {discount}</span>
            </div>
            <div className="divider"></div>
            <div className="transaction-summary-item text-[24px]">
              <span className="summary-item-total">Total</span>
              <span>Rp. {total}</span>
            </div>
            <div
              className={`transaction-btn-co ${
                loading ? "cursor-wait opacity-50" : ""
              }`}
              onClick={handleCreateTransaction}
            >
              <span>{loading ? "Processing..." : "Checkout"}</span>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

    </>
  );
}
