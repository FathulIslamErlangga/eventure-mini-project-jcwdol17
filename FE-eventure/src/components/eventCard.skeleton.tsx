import '@/css/eventsPage/eventCard.skeleton.css';

export function EventCardSkeleton(){
    return(
        <div className="event-card-skl">
            <div className="event-card-skl-pic">

            </div>
            <div className="event-card-skl-cov">
                <div className="event-card-skl-cov-up">
                    <div className="event-card-skl-ctg"></div>
                    <div className="event-card-skl-date"></div>
                </div>
                <div className="event-card-skl-cov-down">
                    <div className="event-card-skl-cov-down-1">
                        <div className="event-card-skl-title"></div>
                        <div className="event-card-skl-price"></div>
                    </div>
                    <div className="event-card-skl-cov-down-2">
                        <div className="event-card-skl-btn"></div>
                        <div className="event-card-skl-btn"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}