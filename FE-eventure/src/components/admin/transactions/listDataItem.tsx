import transactionsHooks from "@/hooks/transactions.hooks";
import Image from "next/image";
import Link from "next/link";

export function ListDataItem() {
  const { transactions } = transactionsHooks();
  return (
    <>
      {transactions?.data.map((transaction) => {
        const findImage = transaction.customer.profile?.imageProfile.find(
          (image) => image.imageType === "profile"
        );
        return (
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
                  <div className="font-bold">
                    {transaction.customer.profile?.name}
                  </div>
                  <div className="text-sm opacity-50">
                    {transaction.customer.profile?.address?.city}
                  </div>
                </div>
              </div>
            </td>
            <td>
              {transaction.event.name}
              <br />
              <span className="badge badge-ghost badge-sm">
                {transaction.event.category?.name}
              </span>
            </td>
            <td>{transaction.status}</td>
            <td>{transaction.ticketQuantity}</td>
            <td>{transaction.totalPrice}</td>
            <th>
              <button className="btn btn-ghost btn-xs">
                <Link href={`/admin/transactions/${transaction.event.slug}`}>
                  Details
                </Link>
              </button>
            </th>
          </tr>
        );
      })}
    </>
  );
}
