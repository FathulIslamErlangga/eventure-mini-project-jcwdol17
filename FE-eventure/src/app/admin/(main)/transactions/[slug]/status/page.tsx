'use client';
import "@/css/adminPage/transactionPage/transactionDetPage.css";
import withAuth from "@/middlewares/auth.middleware";

export default withAuth (function TransactionDetailPage() {
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
              <input type="text" className="grow" placeholder="Music Concert" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Event Name
              <input type="text" className="grow" placeholder="Music Concert" />
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
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Payment Proof</span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
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
    </div>
  );
},["ORGANIZER"])
