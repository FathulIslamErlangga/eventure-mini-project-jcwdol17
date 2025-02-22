import { useCart } from "@/hooks/cart.hooks";
import Image from "next/image";

export function AttandanceDetListItem() {
  const { attendeeBySlug } = useCart();
  const attendee = attendeeBySlug?.data;
  const findImage = attendee?.event.gallery.find(
    (_) => _.imageType === "thumbnail"
  );
  return (
    <>
      {attendee && (
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
                  <Image
                    src={findImage?.imageUrl || "/fallback.jpg"}
                    alt="Event Thumbnail"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{attendee.event.name}</div>
                <div className="text-sm opacity-50">
                  {attendee.event.address?.city}
                </div>
              </div>
            </div>
          </td>
          {attendee.transaction.status === "DONE" ? (
            <>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <th>
                <button className="btn btn-primary">Save</button>
              </th>
            </>
          ) : (
            <>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" disabled />
                </label>
              </td>
              <th>
                <button className="btn btn-primary" disabled>
                  Save
                </button>
              </th>
            </>
          )}
        </tr>
      )}
    </>
  );
}
