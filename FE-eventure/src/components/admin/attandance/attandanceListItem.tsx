import { useCart } from "@/hooks/cart.hooks";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export function AttandanceListItem() {
  const { attendee } = useCart();

  // Filter attendee yang sesuai dengan kondisi
  const filteredAttendees = attendee?.data || [];

  return (
    <>
      {filteredAttendees?.length > 0 ? (
        filteredAttendees.map((attendeeItem) => {
          // Cari hanya image thumbnail
          const thumbnail = attendeeItem.event.gallery?.find(
            (g) => g.imageType === "thumbnail"
          );

          return (
            <tr key={attendeeItem.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="mask mask-squircle h-12 w-12">
                    <div className="avatar">
                      <Image
                        src={thumbnail?.imageUrl || "/fallback.jpg"}
                        alt="Event Thumbnail"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{attendeeItem.event.name}</div>
                    <div className="text-sm opacity-50">
                      {attendeeItem.event.address?.city || "Unknown City"}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {format(new Date(attendeeItem.event.startDate), "yyyy MM dd")}
              </td>
              <td>
                {format(new Date(attendeeItem.event.endDate), "yyyy MM dd")}
              </td>
              <td>On Going</td>
              <th>
                <button className="btn btn-ghost btn-xs">
                  <Link href={`/admin/attandance/${attendeeItem.user.slug}`}>
                    Details
                  </Link>
                </button>
              </th>
            </tr>
          );
        })
      ) : (
        // Jika tidak ada attendee yang cocok, tampilkan pesan "Not Found"
        <tr>
          <td colSpan={6} className="text-center py-4">
            Not Found Attendee
          </td>
        </tr>
      )}
    </>
  );
}
