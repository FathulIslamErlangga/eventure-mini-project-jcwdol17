import "@/css/adminPage/eventsPage/eventsDetPage.css";

export default function AdminEventDetailsPage() {
  return (
    <div className="admin-event-details">
      <div className="admin-event-details-title">
        <span>Event Details</span>
      </div>
      <div className="admin-event-details-content">
        <form className="eventure-form" action="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Event Name
              <input type="text" className="grow" placeholder="Music Concert" />
            </label>
            <select className="select select-bordered w-full border-[2.5px] border-[#04002D]">
              <option disabled selected>
                Select a category
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Start Date
              <input type="date" className="grow" placeholder="DD/MM/YYYY" />
            </label>
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              End Date
              <input type="date" className="grow" placeholder="DD/MM/YYYY" />
            </label>
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Address
              <input
                type="text"
                className="grow"
                placeholder="Jl. Raya No. 123"
              />
            </label>
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              City
              <input type="text" className="grow" placeholder="Badung" />
            </label>
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Price (IDR)
              <input type="number" className="grow" placeholder="1000000" />
            </label>
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Available Seat
              <input type="number" className="grow" placeholder="100" />
            </label>
            <textarea
              className="border-[2.5px] border-[#04002D] textarea textarea-bordered"
              placeholder="Event Description"
            ></textarea>
            <div className="flex flex-col gap-2">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Pick a Event Picture</span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full border-[2.5px] border-[#04002D]"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Pick a Thumnail Event Picture
                  </span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full border-[2.5px] border-[#04002D]"
                />
              </label>
              <select className="select select-bordered w-full border-[2.5px] border-[#04002D]">
              <option disabled selected>
                Select Status
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            </div>
          </div>
          <button className="eventure-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
