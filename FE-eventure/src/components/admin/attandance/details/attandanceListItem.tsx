import { useCart } from "@/hooks/cart.hooks";
import { log } from "console";
import Image from "next/image";

export function AttandanceDetListItem() {
  const {
    attendeeBySlug,
    checkedIn,
    isLoading,
    updateCheckin,
    handleCheckinChange,
  } = useCart();
  console.log("checked", checkedIn);
  const attendee = attendeeBySlug?.data;
  const event = attendee?.event;
  const address = event?.address; // Perbaikan dengan optional chaining
  const gallery = event?.gallery || [];
  const findImage = gallery.find((img) => img.imageType === "thumbnail");
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
                <div className="font-bold">{event?.name}</div>
                <div className="text-sm opacity-50">{address?.city}</div>
              </div>
            </div>
          </td>
          {attendee.checkedIn === true ? (
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
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={checkedIn}
                    onChange={handleCheckinChange}
                    disabled={isLoading || checkedIn}
                  />
                </label>
              </td>
              <th>
                <button
                  className="btn btn-primary"
                  onClick={() => updateCheckin(checkedIn)}
                  disabled={isLoading || checkedIn}
                >
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
