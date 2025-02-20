"use client";
import { useState, useEffect } from "react";
import { JumbotronSlide } from "./jumbotron.slide";
import { JumbotronNavigation } from "./jumbotron.navigation";
import "@/css/homePage/jumbotronStyle.css";
import useEvent from "@/hooks/useEvent.hooks";
import { IEvents } from "@/utils/interfaces/interfaces";

export function Jumbotron() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { events } = useEvent();
  const { getevent, loading, error, getEventData } = events;
  const [featuredEvents, setFeaturedEvents] = useState<IEvents[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await getEventData(1);
        if (getevent?.data) {
          setFeaturedEvents(getevent.data.slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [getEventData, getevent]);

  const totalSlides = 1 + featuredEvents.length; // Intro + event slides

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="jumbotron">
      <div className="jumbotron-container">
        <div className="jumbotron-content">
          <JumbotronSlide
            isActive={currentSlide === 0}
            type="intro"
            title="Discover, Choose, Attend!"
            description="Explore thousands of exciting events and buy tickets easily only at Eventure."
            buttonText="Discover More"
          />
          {featuredEvents.map((event, index) => (
            <JumbotronSlide
              key={event.id}
              isActive={currentSlide === index + 1}
              type="event"
              event={event}
            />
          ))}
          <JumbotronNavigation
            totalSlides={totalSlides}
            currentSlide={currentSlide}
            onDotClick={handleDotClick}
          />
        </div>
      </div>
    </div>
  );
}
