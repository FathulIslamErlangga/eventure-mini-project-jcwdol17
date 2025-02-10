import '@/css/notifPage/notifCard.css';

export function NotifCard() {
  return (
    <div className="notif-card">
      <div className="notif-card-date">
        <span>23/01/2025</span>
      </div>
      <div className="notif-card-title">
        <span>Transaction</span>
      </div>
      <div className="notif-card-message">
        <span>Your transaction has been successfully completed</span>
      </div>
    </div>
  );
}
