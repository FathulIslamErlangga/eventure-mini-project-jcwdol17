import "@/css/eventsPage/eventDet.skeleton.css";

export function EventDetSkeleton() {
  return (
    <div className="event-det-skl">
      <div className="event-det-skl-header"></div>
      <div className="event-det-skl-content">
        <div className="event-det-skl-pic"></div>
        <div className="event-det-skl-btn">
          <div className="event-det-skl-btn-x"></div>
          <div className="event-det-skl-btn-x"></div>
          <div className="event-det-skl-btn-x"></div>
        </div>
      </div>
      <div className="event-det-skl-desc">
        <div className="event-det-skl-desc-1"></div>
        <div className="event-det-skl-desc-2"></div>
      </div>
    </div>
  );
}
