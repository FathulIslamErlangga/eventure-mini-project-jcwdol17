import { AttandanceListItem } from "./attandanceListItem";

export function AttandanceData() {
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
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <AttandanceListItem />
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Event</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
