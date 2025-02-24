"use client";
import "@/css/navbar.css";
import Image from "next/image";
import { useLoadingNavigation } from "@/hooks/loadingNav.hook";

interface MainNavbarProps {
  toggleMenu: () => void;
  toggleSearch: () => void;
  isSearchOpen: boolean;
}

export function MainNavbar({
  toggleMenu,
  toggleSearch,
  isSearchOpen,
}: MainNavbarProps) {
  const { navigateWithLoading, LoadingWrapper } = useLoadingNavigation();
  const handleClick = (path: string) => {
    navigateWithLoading(path);
  };

  return (
    <>
      <LoadingWrapper />
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

            <div
              className="cart-icon bg-neutral"
              onClick={() => handleClick("/cart")}
            >
              <Image
                src="/assets/images/icons/cart.svg"
                alt="cart-icon"
                width={50}
                height={50}
              />
            </div>
          </div>

          <div className="logo" onClick={() => handleClick("/")}>
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
                width={50}
                height={50}
              />
            </div>

            <div
              className="indicator"
              onClick={() => handleClick("/notifications")}
            >
              <div className="notifications-icon">
                <Image
                  src="/assets/images/icons/notification.svg"
                  alt="bell-icon"
                  width={50}
                  height={50}
                />
              </div>
              {/* <span className="badge badge-md badge-primary indicator-item">
                8
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
