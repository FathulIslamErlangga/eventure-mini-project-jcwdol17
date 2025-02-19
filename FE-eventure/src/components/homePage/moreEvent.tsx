'use client';
import "@/css/homePage/moreEvent.css";
import { EventCard2 } from "../eventCard2";
import { useMemo, useState, useEffect } from "react";
import useEvent from "@/hooks/useEvent.hooks";
import { IEvents } from "@/utils/interfaces/interfaces";
import Link from 'next/link';

export function MoreEvent() {
  const { events, categories} = useEvent();
  const { category } = categories;
  const { getevent, getEventData } = events;
  const [eventList, setEventList] = useState<IEvents[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const eventsWithCategories = useMemo(() => {
    if (!getevent?.data || !category?.data) return [];

    return getevent.data.map((event) => {
      const eventCategory = category.data.find(
        (cat) => cat.id === (event.categoryId as unknown as string)
      );
      return {
        ...event,
        category: eventCategory || { 
          name: "Uncategorized", 
          id: "", 
          slug: "",
          events: []
        },
      };
    });
  }, [getevent?.data, category?.data]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await getEventData(1);
        if (getevent?.data) {
          setEventList(getevent.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [getEventData, getevent]);


  return (
       <div className="moreEvent">
      <div className="moreEvent-title">
        <div className="moreEvent-title-text">
          <span>More Event</span>
        </div>
        <Link href='/events'>
        <div className="moreEvent-title-btn">
          <span>See More</span>
        </div>
        </Link>
      </div>
      <div className="moreEvent-content">
        {isLoading ? (
          <div className="loading-spinner">Loading events...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : eventsWithCategories.length === 0 ? (
          <div className="no-events">No events available</div>
        ) : (
          eventsWithCategories.slice(0, 4).map((event) => (
            <EventCard2 key={event.id} {...event} />
          ))
        )}
      </div>
    </div>
  );
}
