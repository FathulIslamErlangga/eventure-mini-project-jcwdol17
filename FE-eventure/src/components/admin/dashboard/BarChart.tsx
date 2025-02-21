import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "@/css/adminPage/dashboardPage/eventsChart.css";
import useEvent from "@/hooks/useEvent.hooks";
import { useMemo } from "react";

export default function EventsChart2() {
  const { events, categories } = useEvent();
  const { getevent } = events;
  const { category } = categories;

  const eventsByCategory = useMemo(() => {
    if (!getevent?.data || !category?.data)
      return { categories: [], counts: [] };

    // Create a map to count events per category
    const categoryCountMap = new Map<string, number>();

    // Initialize the map with all categories
    category.data.forEach((cat) => {
      categoryCountMap.set(cat.name, 0);
    });

    // Count events per category
    getevent.data.forEach((event) => {
      const eventCategory = category.data.find(
        (cat) => cat.id === (event.categoryId as unknown as string)
      );

      if (eventCategory) {
        const currentCount = categoryCountMap.get(eventCategory.name) || 0;
        categoryCountMap.set(eventCategory.name, currentCount + 1);
      }
    });

    // Convert map to arrays for chart
    const categories = Array.from(categoryCountMap.keys());
    const counts = Array.from(categoryCountMap.values());

    return { categories, counts };
  }, [getevent, category]);

  return (
    <div className="events-chart">
      <div className="events-chart-title">
        <span>Events by Category</span>
      </div>
      <div className="events-chart-content">
        <BarChart
          xAxis={[
            {
              id: "categoryAxis",
              data: eventsByCategory.categories,
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: eventsByCategory.counts,
              label: "Number of Events",
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}
