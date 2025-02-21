"use client";
import Image from "next/image";
import "@/css/eventsPage/eventsPage.css";
import "@/css/homePage/categoriesStyle.css";
import { EventCard2 } from "../eventCard2";
import useEvent from "@/hooks/useEvent.hooks";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { EventCardSkeleton } from "../eventCard.skeleton";
import { NoData } from "../noData";

export function EventsPage() {
  const { events, categories } = useEvent();
  const { getevent, loading, error, getEventData } = events;
  const { category } = categories;
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const locationFilter = searchParams.get("location")?.toLowerCase() || "";
  const categoryFilter = searchParams.get("category")?.toLowerCase() || "";

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

  const filteredEvents = useMemo(() => {
    if (!getevent?.data) return [];

    return getevent.data
      .map((event) => {
        const eventCategory = category?.data.find(
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
      })
      .filter((event) => {
        const matchesSearch =
          !searchQuery ||
          event.name.toLowerCase().includes(searchQuery) ||
          event.description.toLowerCase().includes(searchQuery);

        const matchesLocation =
          !locationFilter ||
          event.address?.city?.toLowerCase().includes(locationFilter);

        const matchesCategory =
          !categoryFilter ||
          event.category.name.toLowerCase().includes(categoryFilter);

        return matchesSearch && matchesLocation && matchesCategory;
      });
  }, [getevent?.data, searchQuery, locationFilter, categoryFilter]);

  return (
    <div className="events-page">
      <div className="events-title">
        <div className="events-title-text">Events</div>
        <div className="events-pic">
          <Image
            src="/assets/images/contents/events/Star 12.svg"
            alt="star-12"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="events-content">
        <div className="w-full h-fit">
          {loading ? (
            <div className="w-full h-fit flex flex-col md:flex-row lg:flex-row gap-2">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="events-content-1">
              {filteredEvents.map((event) => (
                <EventCard2 key={event.id} {...event} />
              ))}
            </div>
          ) : (
            <>
              <NoData messages={`No events found`} />
            </>
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
