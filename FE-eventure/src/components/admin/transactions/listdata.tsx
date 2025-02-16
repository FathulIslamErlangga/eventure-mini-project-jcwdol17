import { ListDataItem } from "./listDataItem";


export function TransactionData(){
    return(
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
              <th>Event</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <ListDataItem/>
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
    )
}