import { EventListDataItem } from "./eventListDataItem";
import useEvent from "@/hooks/useEvent.hooks";
import { useEffect } from "react";

export function EventListData() {
  const { events } = useEvent();
  const { getevent, loading, error, getEventData } = events;

  useEffect(() => {
    getEventData(1);
  }, []);

  return (
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
          {getevent?.data && getevent?.data.map((event) => (
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
  );
}
