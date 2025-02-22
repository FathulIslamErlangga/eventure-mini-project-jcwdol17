import "@/css/profilePage/pointLogCard.css";
import { useAuth } from "../contexts/AuthContexts";

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
          <div className="pointlog-card-status">
            <span>{point.type}</span>
          </div>
        </div>
      ))}
    </>
  );
}
