import { AttandanceDetListItem } from "./attandanceListItem";

export function AttandanceDetData() {
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
            <th>Name</th>
            <th>Attend</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            <AttandanceDetListItem/>
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Attend</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
