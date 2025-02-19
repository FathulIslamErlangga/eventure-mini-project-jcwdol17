"use client";
import Image from "next/image";
import "@/css/homePage/upComingEvents.css";
import "@/css/eventsPage/eventCard.css";
import { EventCard } from "../eventCard";
import useEvent from "@/hooks/useEvent.hooks";
import React, { useState, useEffect, useMemo } from "react";
import { IEvents } from "@/utils/interfaces/interfaces";
import { EventCardSkeleton } from "../eventCard.skeleton";
import { NoData } from "../noData";

export function UpComingEvents() {
  const { events, categories } = useEvent();
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
          events: [],
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
    <div className="upcoming-events">
      <div className="ue-title">
        <div className="ue-title-text">
          <span>Upcoming Events</span>
        </div>
      </div>
      <div className="ue-content">
        {isLoading ? (
          <EventCardSkeleton />
        ) : error ? (
          <>
            <NoData messages={error} />
          </>
        ) : eventsWithCategories.length === 0 ? (
          <div className="no-events">No events available</div>
        ) : (
          <>
            <EventCard {...eventsWithCategories[0]} />
          </>
        )}
      </div>
      <div className="ue-content-2">
        {isLoading ? (
          <EventCardSkeleton />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : eventsWithCategories.length === 0 ? (
          <div className="no-events">No events available</div>
        ) : (
          <>
            {eventsWithCategories.slice(1, 3).map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
