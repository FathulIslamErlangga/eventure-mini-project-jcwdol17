"use client";
import "@/css/navbar.css";
import Image from "next/image";
import { useAuth } from "./contexts/AuthContexts";

interface ListMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export function ListMenu({ isMenuOpen, toggleMenu }: ListMenuProps) {
  const { auth } = useAuth();
  const users = auth.user?.data.slug;

  const handleMenuClick = (path: string) => {
    window.location.href = path;
    toggleMenu();
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
            <div className="list-menu-dt" onClick={() => handleMenuClick("/")}>
              <div className="list-menu-text">
                <span>Home</span>
              </div>
            </div>
            <div
              className="list-menu-dt"
              onClick={() => handleMenuClick("/events")}
            >
              <div className="list-menu-text">
                <span>Events</span>
              </div>
            </div>

            <div
              className="list-menu-dt"
              onClick={() => handleMenuClick("/eo")}
            >
              <div className="list-menu-text">
                <span>Event Organizer</span>
              </div>
            </div>
            <div
              className="list-menu-dt"
              onClick={() => handleMenuClick("/purchase")}
            >
              <div className="list-menu-text">
                <span>Purchase</span>
              </div>
            </div>
            <div
              className="list-menu-dt"
              onClick={() => handleMenuClick("/about")}
            >
              <div className="list-menu-text">
                <span>About</span>
              </div>
            </div>
          </div>

          <div className="list-menu-down">
            {auth.user ? (
              <>
                <div className="list-menu-join">
                  <div
                    className="list-menu-profile"
                    onClick={() => handleMenuClick(`/eprofile/${users}`)}
                  >
                    <div className="list-menu-icon">
                      <Image
                        src="/assets/images/icons/userProfile.png"
                        alt="profile-icon"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="list-menu-text">
                      <span>Profile</span>
                    </div>
                  </div>

                  <div className="list-menu-dt bg-error" onClick={auth.logout}>
                    <div className="list-menu-text">
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="list-menu-join">
                  <div
                    className="list-menu-dt"
                    onClick={() => handleMenuClick("/signin")}
                  >
                    <div className="list-menu-text">
                      <span>Login</span>
                    </div>
                  </div>

                  <div
                    className="list-menu-dt"
                    onClick={() => handleMenuClick("/signup")}
                  >
                    <div className="list-menu-text">
                      <span>Register</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
