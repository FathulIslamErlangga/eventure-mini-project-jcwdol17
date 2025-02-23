"use client";
import "@/css/adminPage/transactionPage/transactionDetPage.css";
import transactionsHooks from "@/hooks/transactions.hooks";
import withAuth from "@/middlewares/auth.middleware";
import {
  PaymentMethod,
  TransactionStatus,
} from "@/utils/interfaces/interfaces";
import { format } from "date-fns";
import { FormEvent, useState } from "react";

export default withAuth(
  function TransactionDetailPage() {
    const { transaction, uploadProof } = transactionsHooks();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleViewProof = () => {
      setModalOpen(true);
    };

    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const handleStatusChange = async (e: FormEvent) => {
      e.preventDefault();
      if (!transaction?.data?.id) return;
      try {
        await uploadProof(selectedStatus, transaction.data.id);
        alert("Transaction status updated successfully");
      } catch (error) {
        console.error("Error updating status", error);
      }
    };

    return (
      <div className="transaction-detail-page">
        <div className="transaction-detail-title">
          <span>Transaction Detail</span>
        </div>
        <div className="transaction-detail-content">
          <form className="eventure-form" onSubmit={handleStatusChange}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              <label className="input input-bordered flex items-center gap-2">
                Name
                <input
                  type="text"
                  className="grow"
                  placeholder="Music Concert"
                  value={transaction?.data?.customer.profile?.name || ""}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Event Name
                <input
                  type="text"
                  className="grow"
                  placeholder="Music Concert"
                  value={transaction?.data?.event?.name || ""}
                  disabled
                />
              </label>
              <select className="select select-bordered w-full" disabled>
                <option disabled>
                  {transaction?.data?.event?.category?.name || "No Category"}
                </option>
              </select>
              <label className="input input-bordered flex items-center gap-2">
                Start Date
                <input
                  type="date"
                  className="grow"
                  placeholder="DD/MM/YYYY"
                  value={
                    transaction?.data?.event?.startDate
                      ? format(
                          new Date(transaction.data.event.startDate),
                          "yyyy-MM-dd"
                        )
                      : ""
                  }
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                End Date
                <input
                  type="date"
                  className="grow"
                  placeholder="DD/MM/YYYY"
                  value={
                    transaction?.data?.event?.endDate
                      ? format(
                          new Date(transaction.data.event.endDate),
                          "yyyy-MM-dd"
                        )
                      : ""
                  }
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Address
                <input
                  type="text"
                  className="grow"
                  placeholder="Jl. Raya No. 123"
                  value={transaction?.data?.event?.address?.address || ""}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                City
                <input
                  type="text"
                  className="grow"
                  placeholder="Badung"
                  value={transaction?.data?.event?.address?.city || ""}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Qty
                <input
                  type="number"
                  className="grow"
                  placeholder="Ticket Quantity"
                  value={transaction?.data?.ticketQuantity || ""}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Total Price (IDR)
                <input
                  type="number"
                  className="grow"
                  placeholder="Total Price"
                  value={transaction?.data?.totalPrice || ""}
                  disabled
                />
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex gap-2 w-full justify-between">
                  <div className="label">
                    <span className="label-text">Payment Proof</span>
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={handleViewProof}
                  >
                    View Payment Proof
                  </button>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option disabled value="">
                    Payment Status
                  </option>
                  <option value={TransactionStatus.DONE}>
                    {TransactionStatus.DONE}
                  </option>
                  <option value={TransactionStatus.CANCELED}>
                    {TransactionStatus.CANCELED}
                  </option>
                  <option value={TransactionStatus.EXPIRED}>
                    {TransactionStatus.EXPIRED}
                  </option>
                  <option value={TransactionStatus.REJECTED}>
                    {TransactionStatus.REJECTED}
                  </option>
                </select>
              </div>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Note"
              ></textarea>
            </div>
            <button className="eventure-button" type="submit">
              Submit
            </button>
          </form>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg max-w-xl w-full relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Payment Proof</h2>
              <img
                src={transaction?.data?.paymentProof}
                alt={`Payment Proof`}
                className="max-w-full max-h-[70vh] mx-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    );
  },
  ["ORGANIZER"]
);
