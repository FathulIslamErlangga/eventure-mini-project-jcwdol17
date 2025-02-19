"use client";
import "@/css/navbar.css";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./contexts/AuthContexts";

interface MainNavbarProps {
  toggleMenu: () => void;
  toggleSearch: () => void;
  isSearchOpen: boolean;
}

export function MainNavbar({ toggleMenu, toggleSearch, isSearchOpen }: MainNavbarProps) {
  const { auth } = useAuth();
  const users = auth.user?.data.slug;

  return (
    <div className="enavbar">
      <div className="enavbarContent">
        <div className="flex gap-2">
          <div className="menubar-icon" onClick={toggleMenu}>
            <Image
              src="/assets/images/icons/menu.svg"
              alt="menu-icon"
              width={50}
              height={50}
            />
          </div>
          <Link href="/cart">
            <div className="cart-icon bg-neutral">
              <Image
                src="/assets/images/icons/cart.svg"
                alt="cart-icon"
                width={50}
                height={50}
              />
            </div>
          </Link>
        </div>
        <Link href="/">
          <div className="logo">
            <Image
              src="/assets/images/icons/mainIcon.svg"
              alt="logo-icon"
              width={55}
              height={55}
            />
          </div>
        </Link>
        <div className="mainbar">
          <div className="search-icon" onClick={toggleSearch}>
            <Image
              src={
                isSearchOpen
                  ? "/assets/images/icons/close.svg"
                  : "/assets/images/icons/search.svg"
              }
              alt={isSearchOpen ? "close-icon" : "search-icon"}
              width={50}
              height={50}
            />
          </div>
          <Link href="/notifications">
            <div className="indicator">
              <div className="notifications-icon">
                <Image
                  src="/assets/images/icons/notification.svg"
                  alt="bell-icon"
                  width={50}
                  height={50}
                />
              </div>
              <span className="badge badge-md badge-primary indicator-item">
                8
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
