import Link from "next/link";

export function ListDataItem() {
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
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Blackpink Comeback
          <br />
          <span className="badge badge-ghost badge-sm">Music & Concert</span>
        </td>
        <td>2</td>
        <td>$20</td>
        <th>
          <button className="btn btn-ghost btn-xs">
            <Link href="/admin/transactions/1">Details</Link>
          </button>
        </th>
      </tr>
    </>
  );
}
