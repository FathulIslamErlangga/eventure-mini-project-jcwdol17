"use client";
import "@/css/navbar.css";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useState } from "react";

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
      <div className={`list-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="list-menu-btn">
          <div className="close-icon" onClick={toggleMenu}>
            <Image
              src="/assets/images/icons/close.svg"
              alt="close-icon"
              width={35}
              height={35}
            />
          </div>
        </div>
        <div className="list-menu-content">
          <div className="list-menu-up">
            <Link href="/">
              <div className="list-menu-dt">
                <div className="list-menu-text">
                  <span>Home</span>
                </div>
              </div>
            </Link>
            <Link href="/events">
              <div className="list-menu-dt">
                <div className="list-menu-text">
                  <span>Events</span>
                </div>
              </div>
            </Link>
            <Link href="/eo">
              <div className="list-menu-dt">
                <div className="list-menu-text">
                  <span>Event Organizer</span>
                </div>
              </div>
            </Link>
            <Link href="/">
              <div className="list-menu-dt">
                <div className="list-menu-text">
                  <span>About</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="list-menu-down">
            <div className="list-menu-join hidden">
              <Link href="/">
                <div className="list-menu-dt">
                  <div className="list-menu-text">
                    <span>Login</span>
                  </div>
                </div>
              </Link>
              <Link href="/">
                <div className="list-menu-dt">
                  <div className="list-menu-text">
                    <span>Register</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="list-menu-join">
              <Link href="/">
                <div className="list-menu-profile">
                  <div className="list-menu-icon">
                    <Image
                      src="/assets/images/icons/userProfile.png"
                      alt="profile-icon"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="list-menu-text">
                    <span>Profile</span>
                  </div>
                </div>
              </Link>
              <Link href="/">
                <div className="list-menu-dt bg-error">
                  <div className="list-menu-text">
                    <span>Logout</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="enavbar">
        <div className="enavbarContent">
          <div className="flex gap-2">
            <div className="menubar-icon" onClick={toggleMenu}>
              <Image
                src="/assets/images/icons/menu.svg"
                alt="menu-icon"
                width={30}
                height={30}
              />
            </div>
            <div className="cart-icon bg-neutral">
              <Image
                src="/assets/images/icons/cart.svg"
                alt="cart-icon"
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="logo">
            <Image
              src="/assets/images/icons/mainIcon.svg"
              alt="logo-icon"
              width={55}
              height={55}
            />
          </div>
          <div className="mainbar">
            <div className="search-icon" onClick={toggleSearch}>
              <Image
                src={
                  isSearchOpen
                    ? "/assets/images/icons/close.svg"
                    : "/assets/images/icons/search.svg"
                }
                alt={isSearchOpen ? "close-icon" : "search-icon"}
                width={35}
                height={35}
              />
            </div>
            <div className="indicator">
              <div className="notifications-icon">
                <Image
                  src="/assets/images/icons/notification.svg"
                  alt="bell-icon"
                  width={35}
                  height={35}
                />
              </div>
              <span className="badge badge-md badge-primary indicator-item">
                8
              </span>
            </div>
          </div>
        </div>
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
                  <option value="">Locations</option>
                  <option value="jakarta">Jakarta</option>
                  <option value="bandung">Bandung</option>
                  <option value="surabaya">Surabaya</option>
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
                  <option value="">Categories</option>
                  <option value="music">Music</option>
                  <option value="sports">Sports</option>
                  <option value="arts">Arts</option>
                  <option value="food">Food</option>
                </select>
              </div>

              <button className="search-button">
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
      </div>
    </>
  );
}
