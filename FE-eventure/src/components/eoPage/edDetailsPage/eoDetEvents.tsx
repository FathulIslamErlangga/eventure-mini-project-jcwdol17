import { EventCard2 } from "@/components/eventCard2";
import Image from "next/image";
import "@/css/eoPage/eoDetailsPage/eoDetEvents.css";
import useEvent from "@/hooks/useEvent.hooks";
import { useMemo, useState } from "react";
import { EventCardSkeleton } from "@/components/eventCard.skeleton";
import { NoData } from "@/components/noData";

export function EoDetEvents() {
  const { events, categories } = useEvent();

  const { category } = categories;
  const { getevent, loading, error, getEventData } = events;
  const [currentPage, setCurrentPage] = useState(1);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getEventData(page);
  };

  const pageNumbers = useMemo(() => {
    if (!getevent?.meta) return [];
    const totalPages = getevent.meta.totalPages;
    console.log("total page : " + totalPages);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [getevent?.meta]);

  return (
    <div className="eo-det-events">
      <div className="eo-det-events-title">
        <div className="eo-det-events-title-text">
          <span>Events</span>
        </div>
        <div className="eo-det-events-title-pic">
          <Image
            src="/assets/images/contents/events/Star 12.svg"
            alt="star 12"
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className="eo-det-events-content">
        <div className="eo-det-events-content-1">
          {loading ? (
            <div className="w-full h-fit flex gap-4">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : eventsWithCategories.length > 0 ? (
            eventsWithCategories.map((event) => <EventCard2 key={event.id} {...event} />)
          ) : (
            <NoData messages={`No events exists`} />
          )}
        </div>
        <div className="events-pagination">
          <div className="join">
            <button
              className={`join-item btn ${
                !getevent?.meta?.hasPrevPage ? "btn-disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!getevent?.meta?.hasPrevPage}
            >
              «
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                className={`join-item btn ${
                  number === currentPage ? "btn-active" : ""
                }`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
            <button
              className={`join-item btn ${
                !getevent?.meta?.hasNextPage ? "btn-disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!getevent?.meta?.hasNextPage}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}