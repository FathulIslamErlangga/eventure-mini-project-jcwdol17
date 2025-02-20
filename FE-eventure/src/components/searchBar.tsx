"use client";
import "@/css/navbar.css";
import useEvent from "@/hooks/useEvent.hooks";
import { useLoadingNavigation } from "@/hooks/loadingNav.hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface SearchBarProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function SearchBar({
  isSearchOpen,
  toggleSearch,
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedCategory,
  setSelectedCategory,
}: SearchBarProps) {
  const router = useRouter();
  const { navigateWithLoading, LoadingWrapper } = useLoadingNavigation();
  const { events, categories } = useEvent();
  const { getevent, loading, error } = events;
  const { category } = categories;

  // Debug the first event's addressId structure
  console.log(getevent?.data);

  // Get unique cities from events data
  const uniqueCities = useMemo(() => {
    if (!getevent?.data) return [];

    const cities = getevent.data
      .map((event) => {
        console.log("Event addressId structure:", event.address);
        // Access city from the first address in the array
        return event.address?.city || null;
      })
      .filter((city): city is string => Boolean(city));

    console.log("Found cities:", cities);

    // Remove duplicates and sort alphabetically
    return Array.from(new Set(cities)).sort();
  }, [getevent?.data]);

  const categoryList = useMemo(() => {
    if (!category?.data) return [];
    return category.data.sort((a, b) => a.name.localeCompare(b.name));
  }, [category?.data]);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (searchQuery) {
      searchParams.append("search", searchQuery);
    }
    if (selectedLocation) {
      searchParams.append("location", selectedLocation);
    }
    if (selectedCategory) {
      searchParams.append("category", selectedCategory);
    }

    const queryString = searchParams.toString();
    navigateWithLoading(`/events${queryString ? `?${queryString}` : ""}`);
    toggleSearch();
  };

  return (
    <>
      <div className={`searchContent ${isSearchOpen ? "active" : ""}`}>
        <div className="search-container">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />

            <div className="search-dropdown location-dropdown">
              <Image
                src="/assets/images/icons/location.svg"
                alt="location-icon"
                width={25}
                height={25}
              />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="dropdown-select"
              >
                <option value="" selected>
                  City
                </option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-dropdown category-dropdown">
              <Image
                src="/assets/images/icons/category.svg"
                alt="location-icon"
                width={25}
                height={25}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="dropdown-select"
              >
                <option value="" selected>
                  Category
                </option>
                {categoryList.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={handleSearch} className="search-button">
              <Image
                src="/assets/images/icons/search.svg"
                alt="search"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
