import { EventListDataItem } from "./eventListDataItem";
import useEvent from "@/hooks/useEvent.hooks";
import { useState, useMemo, useEffect } from "react";

export function EventListData() {
  const { events } = useEvent();
  const { getevent, loading, error, getEventData } = events;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getEventData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageNumbers = useMemo(() => {
    if (!getevent?.meta) return [];
    const totalPages = getevent.meta.totalPages;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [getevent?.meta]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Event</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {getevent?.data &&
              getevent?.data.map((event) => (
                <EventListDataItem key={event.id} {...event} />
              ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Event</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="events-pagination mt-4">
        <div className="join">
          <button
            className={`join-item btn ${
              currentPage === 1 ? "btn-disabled" : ""
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`join-item btn ${
                number === currentPage ? "btn-active" : ""
              }`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}

          <button
            className={`join-item btn ${
              currentPage === getevent?.meta?.totalPages ? "btn-disabled" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === getevent?.meta?.totalPages}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
}
