"use client";
import { useState } from "react";
import { ListMenu } from "./listMenu";
import { SearchBar } from "./searchBar";
import { MainNavbar } from "./mainNavbar";
import "@/css/navbar.css";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <MainNavbar
        toggleMenu={toggleMenu}
        toggleSearch={toggleSearch}
        isSearchOpen={isSearchOpen}
      />
      <ListMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <SearchBar
        isSearchOpen={isSearchOpen}
        toggleSearch={toggleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
}
