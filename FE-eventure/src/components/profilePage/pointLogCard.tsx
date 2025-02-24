import "@/css/profilePage/pointLogCard.css";
import { useAuth } from "../contexts/AuthContexts";
import { format } from "date-fns";

export function PointLogCard() {
  const { auth } = useAuth();
  return (
    <>
      {auth.user?.data.wallet?.pointLogs.map((point) => (
        <div className="pointlog-card">
          <div className="pointlog-card-det">
            <div className="pointlog-card-amount">{point.amount}</div>
            <div className="pointlog-card-desc">{point.description}</div>
          </div>
          <div className="gap-2">
            <div className="pointlog-card-status">
              <span>{point.type}</span>
            </div>
            <div className="pointlog-card-status">
              <h1 className="text-lg">Expired Date</h1>
              <span>
                {" "}
                {point.expirationDate
                  ? format(new Date(point.expirationDate), "yyyy MM dd")
                  : "--"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
