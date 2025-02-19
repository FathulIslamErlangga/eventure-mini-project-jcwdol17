"use client";
import { Review } from "@/components/review";
import { EventDetailsContent } from "./content";
import { EDPHeader } from "./header";
import "@/css/eventsPage/eventDetailsPage/eventDetPage.css";
import useEvent from "@/hooks/useEvent.hooks";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IEvents } from "@/utils/interfaces/interfaces";

export function EventDetailsPage() {
  const [event, setEvent] = useState<IEvents>();
  const { events } = useEvent();
  const { getEventBySlug, loading, error } = events;

  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Current Slug:", slug);
        const response = await getEventBySlug(slug);
        console.log("Event Data:", response.data);

        // Directly set the single event from response
        if (response.data) {
          console.log("Setting Event:", response.data);
          setEvent(response.data);
        } else {
          console.error("No events found for slug:", slug);
        }
      } catch (error) {
        console.error("Complete Error Object:", error);
        console.error("Error fetching event for slug:", slug);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading event</div>;
  if (!event) return <div>No event found</div>;
  
  return (
    <div className="event-details-page">
      <EDPHeader {...event} />
      <EventDetailsContent {...event} />
      <Review />
    </div>
  );
}
