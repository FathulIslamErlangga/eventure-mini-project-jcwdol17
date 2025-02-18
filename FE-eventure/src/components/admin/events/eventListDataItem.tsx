import Image from "next/image";
import Link from "next/link";

export function EventListDataItem() {
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
            </div>
          </div>
        </td>
        <td>23/01/2025</td>
        <td>23/01/2025</td>
        <td>Rp. 1.000.000</td>
        <td>On Going</td>
        <th className="flex gap-2">
          <button
            className="btn btn-warning
             p-2"
          >
            <Link href="/admin/events/1" className="flex gap-3 items-center">
              <Image
                src="/assets/images/icons/edit.svg"
                alt="edit"
                width={20}
                height={10}
              />
              Edit
            </Link>
          </button>
          <button
            className="btn btn-error
             p-2"
          >
            <Image
              src="/assets/images/icons/delete.svg"
              alt="delete"
              width={20}
              height={10}
            />
            Delete
          </button>
        </th>
      </tr>
    </>
  );
}
