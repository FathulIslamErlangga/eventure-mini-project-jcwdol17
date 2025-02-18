import { EventListDataItem } from "./eventListDataItem";

export function EventListData() {
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <EventListDataItem/>
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
