import "@/css/profilePage/pointLogCard.css";
import { useAuth } from "../contexts/AuthContexts";
import { format } from "date-fns";

export function VoucherCard() {
  const { auth } = useAuth();

  // Pastikan vouchers ada sebelum diakses
  const vouchers = auth.user?.data.vouchers ?? [];

  return (
    <>
      {vouchers.length > 0 ? (
        vouchers.map((voucher) => (
          <div className="pointlog-card" key={voucher.id}>
            <div className="pointlog-card-det">
              <div className="pointlog-card-amount">{voucher.code}</div>
              <div className="pointlog-card-desc">
                Available: {voucher.usageLimit}
              </div>
            </div>
            <div className="gap-2">
              <div className="pointlog-card-status">
                <h1 className="text-lg">Start Date</h1>
                <span>
                  {voucher.startDate
                    ? format(new Date(voucher.startDate), "yyyy MM dd")
                    : "No Start Date"}
                </span>
              </div>
              <div className="pointlog-card-status">
                <h1 className="text-lg">End Date</h1>
                <span>
                  {voucher.endDate
                    ? format(new Date(voucher.endDate), "yyyy MM dd")
                    : "No End Date"}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-center text-2xl">No vouchers available</h2>
      )}
    </>
  );
}
