import Link from "next/link";

export function AttandanceListItem(){
    return(
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
           23/01/2025
          </td>
          <td>23/01/2025</td>
          <td>On Going</td>
          <th>
            <button className="btn btn-ghost btn-xs">
              <Link href='/admin/attandance/1'>
               Details
              </Link>
            </button>
          </th>
        </tr>
      </>
    )
}