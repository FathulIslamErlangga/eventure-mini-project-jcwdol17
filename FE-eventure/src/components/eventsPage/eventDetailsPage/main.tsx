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
  const [event, setEvent] = useState<IEvents | undefined>();
  const { events } = useEvent();
  const { getEventBySlug, loading, error } = events;

  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventBySlug(slug);
        console.log("Event Data:", response.data);
        setEvent(response.data?.[0]);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchData();
  }, [getEventBySlug, slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-details-page">
      <EDPHeader {...event} />
      {/* <EventDetailsContent {...event} /> */}
      <Review />
    </div>
  );
}
