import '@/css/profilePage/pointLogCard.css'

export function PointLogCard() {
  return (
    <div className="pointlog-card">
      <div className="pointlog-card-det">
        <div className="pointlog-card-amount">100 Points</div>
        <div className="pointlog-card-desc">
          Reward for completing the event
        </div>
      </div>
      <div className="pointlog-card-status">
        <span>Earned</span>
      </div>
    </div>
  );
}
