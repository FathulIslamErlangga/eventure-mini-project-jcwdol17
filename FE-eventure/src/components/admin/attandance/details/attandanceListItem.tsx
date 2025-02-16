export function AttandanceDetListItem() {
  return (
    <>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">Blackpink Comeback</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </td>
        <th>
          <button className="btn btn-primary">Save</button>
        </th>
      </tr>
    </>
  );
}
