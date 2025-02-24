"use client";
import { useAuth } from "@/components/contexts/AuthContexts";
import { ModalReview } from "@/components/modal/modalReview";
import { ModalUploadFile } from "@/components/modal/modalUploadFile";
import { PurchaseCard } from "@/components/purchaseCard";
import "@/css/purchasePage/purchasePage.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  transactionResponse,
  transactionsUserResponse,
} from "@/utils/interfaces/customInsterface";
import transactionsHooks from "@/hooks/transactions.hooks";
import { Skeleton } from "@/components/skeleton";
import { NoData } from "@/components/noData";

export default function PurchasePage() {
  const { auth } = useAuth();
  const userSlug = auth.user?.data.slug;
  const { getUserTransactionBySlug, userTransactions } = transactionsHooks();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      if (userSlug) {
        try {
          await getUserTransactionBySlug(userSlug);
          setLoading(false);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
          setLoading(false);
        }
      }
    };
    fetchTransactionDetail();
  }, [userSlug, getUserTransactionBySlug]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;

  const currentTransactions =
    userTransactions?.data?.slice(
      indexOfFirstTransaction,
      indexOfLastTransaction
    ) || [];

  const totalPages = userTransactions?.data
    ? Math.ceil(userTransactions.data.length / itemsPerPage)
    : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="purchase-page">
        <div className="purchase-page-title">
          <span>Purchase</span>
        </div>
        <div className="purchase-page-content">
          <div className="purchase-page-content-list">
            {loading ? (
              <div className="w-full h-fit flex flex-col items-center justify-center gap-3">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ) : currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => (
                <PurchaseCard key={index} {...transaction} />
              ))
            ) : (
              <div><NoData messages={"No transactions available."} /></div>
            )}
          </div>
          <div className="purchase-page-content-pagination">
            <div className="join">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`join-item btn ${
                    currentPage === index + 1 ? "btn-active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
