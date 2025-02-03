import { EventDetailsContent } from "./content";
import { EDPHeader } from "./header";
import '@/css/eventsPage/eventDetailsPage/eventDetPage.css'

export function EventDetailsPage() {
    return (
        <div className="event-details-page">
            <EDPHeader/>
            <EventDetailsContent/>
        </div>
    )
}