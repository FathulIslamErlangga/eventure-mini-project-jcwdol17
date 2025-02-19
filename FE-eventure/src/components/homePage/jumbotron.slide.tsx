import React, { useState, useEffect } from "react";
import Image from "next/image";
import useEvent from "@/hooks/useEvent.hooks";
import { IEvents } from "@/utils/interfaces/interfaces";
import Link from "next/link";

interface JumbotronSlideProps {
  isActive: boolean;
  type: "intro" | "event";
  title?: string;
  description?: string;
  buttonText?: string;
  imageSrc?: string;
  event?: IEvents;
}

export function JumbotronSlide({
  isActive,
  type,
  title,
  description,
  buttonText,
  imageSrc,
  event,
}: JumbotronSlideProps) {
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

    if (type === "event" && !event) {
      fetchEvents();
    }
  }, [type, getevent, getEventData]);

  if (type === "intro") {
    return (
      <div
        className={`jumbotron-content-1 ${
          isActive ? "slide-active" : "slide-hidden"
        }`}
      >
        <div className="content1-title">
          <span>{title}</span>
        </div>
        <div className="content1-desc">
          <span>{description}</span>
        </div>
        <div className="content1-btn">
          <div className="jumbotron-btn">
            <span>{buttonText}</span>
          </div>
        </div>
        <div className="content1-imgs">
          <div className="content1-img">
            <Image
              src="/assets/images/contents/homePage/cd.png"
              alt="cd-pic"
              width={300}
              height={200}
            />
          </div>
          <div className="content2-img">
            <Image
              src="/assets/images/contents/homePage/microphone.png"
              alt="mic-pic"
              width={200}
              height={400}
            />
          </div>
          <div className="content3-img">
            <Image
              src="/assets/images/contents/homePage/headphone.png"
              alt="headphone-pic"
              width={200}
              height={200}
            />
          </div>
          <div className="content4-img">
            <Image
              src="/assets/images/contents/homePage/radio.png"
              alt="radio-pic"
              width={300}
              height={200}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "event") {
    const displayEvent = event || featuredEvents[0];

    if (!displayEvent) return null;

    return (
      <div
        className={`jumbotron-content-2 ${
          isActive ? "slide-active" : "slide-hidden"
        }`}
      >
        <div className="jumbotron-content2-img">
          <Image
            src={
              displayEvent.gallery?.[0]?.imageUrl ||
              "/assets/images/contents/events/Sample 1.jpg"
            }
            alt={displayEvent.name}
            width={1920}
            height={1080}
          />
        </div>
        <div className="jumbotron-content2-cov">
          <div className="cov-upper">
            <div className="cov-date">
              {new Date(displayEvent.startDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </div>
            <div className="cov-ticket-left">
              <span className="text-[33px]">{displayEvent.availableSeats}</span>
              <br />
              Tickets
              <br />
              Left
            </div>
          </div>
          <div className="cov-lower">
            <div className="lower-part-1">
              <div className="cov-price">
                Rp {displayEvent.price?.toLocaleString() || "0"}
              </div>
              <div className="cov-title">{displayEvent.name}</div>
            </div>
            <div className="lower-part-2">
              <Link href={`/events/${displayEvent.slug}`}>
                <div className="event-btn">Buy Now</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
