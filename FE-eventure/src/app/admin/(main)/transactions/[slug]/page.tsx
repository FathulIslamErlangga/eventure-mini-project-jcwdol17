"use client";
import "@/css/adminPage/transactionPage/transactionDetPage.css";
import withAuth from "@/middlewares/auth.middleware";
import { useState } from "react";

export default withAuth(
  function TransactionDetailPage() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleViewProof = () => {
      setModalOpen(true);
    };

    const handleCloseModal = () => {
      setModalOpen(false);
    };

    return (
      <div className="transaction-detail-page">
        <div className="transaction-detail-title">
          <span>Transaction Detail</span>
        </div>
        <div className="transaction-detail-content">
          <form className="eventure-form" action="">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              <label className="input input-bordered flex items-center gap-2">
                Name
                <input
                  type="text"
                  className="grow"
                  placeholder="Music Concert"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Event Name
                <input
                  type="text"
                  className="grow"
                  placeholder="Music Concert"
                />
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Event category
                </option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
              <label className="input input-bordered flex items-center gap-2">
                Start Date
                <input type="date" className="grow" placeholder="DD/MM/YYYY" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                End Date
                <input type="date" className="grow" placeholder="DD/MM/YYYY" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Address
                <input
                  type="text"
                  className="grow"
                  placeholder="Jl. Raya No. 123"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                City
                <input type="text" className="grow" placeholder="Badung" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Qty
                <input type="number" className="grow" placeholder="1000000" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Total Price (IDR)
                <input type="number" className="grow" placeholder="1000000" />
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
                <select className="select select-bordered w-full">
                  <option disabled selected>
                    Payment Status
                  </option>
                  <option>Waiting</option>
                  <option>Accepted</option>
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
            <h2 className="text-xl font-bold mb-4 capitalize">
              {/* {viewImageModal.type} Image */}
            </h2>
            {/* <img
              src={viewImageModal.imageUrl}
              alt={`${viewImageModal.type} image`}
              className="max-w-full max-h-[70vh] mx-auto object-contain"
            /> */}
          </div>
        </div>
        )}
      </div>
    );
  },
  ["ORGANIZER"]
);
