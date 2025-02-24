"use client";
import Image from "next/image";
import "@/css/adminPage/sidebar.css";
import Link from "next/link";
import { useAuth } from "@/components/contexts/AuthContexts";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const { auth } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    auth.logout();
    router.push("/admin/signin");
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-5 flex justify-between">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-neutral drawer-button border-[3px] border-[#03002D]"
        >
          <Image
            src="/assets/images/icons/menu.svg"
            alt="menuicon"
            width={20}
            height={20}
          />
        </label>
        <Link href="/admin/notifications">
          <div className="indicator">
            <div className="notifications-icon">
              <Image
                src="/assets/images/icons/notification.svg"
                alt="bell-icon"
                width={50}
                height={50}
              />
            </div>
          </div>
        </Link>
      </div>
      <div className="drawer-side z-[99]">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-primary text-neutral min-h-full w-80 p-4 border-[#03002D] border-[5px] shadow-[6px_4px_0_#03002D] flex flex-col justify-between">
          {/* Sidebar content here */}
          <div className="w-full h-fit flex flex-col gap-3">
            <Link href="/admin">
              <div className="w-full h-fit flex flex-row gap-2 items-center text-[20px] font-bold">
                <Image
                  src="/assets/images/icons/logo-white.svg"
                  alt="eventureicon"
                  width={50}
                  height={50}
                />
                <span>Eventure</span>
              </div>
            </Link>
            <div className="w-full h-fit flex flex-col ">
              <li>
                <Link href="/admin">
                  <div className="w-full h-fit flex flex-row gap-2 items-center">
                    <Image
                      src="/assets/images/icons/dashboard.svg"
                      alt="dashboardicon"
                      width={30}
                      height={30}
                    />
                    <a>Dashboard</a>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/admin/events">
                  <div className="w-full h-fit flex flex-row gap-2 items-center">
                    <Image
                      src="/assets/images/icons/event.svg"
                      alt="eventicon"
                      width={30}
                      height={30}
                    />
                    <a>Events</a>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/admin/transactions">
                  <div className="w-full h-fit flex flex-row gap-2 items-center">
                    <Image
                      src="/assets/images/icons/transaction.svg"
                      alt="transaction-icon"
                      width={30}
                      height={30}
                    />
                    <a>Transactions</a>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/admin/attandance">
                  <div className="w-full h-fit flex flex-row gap-3 items-center">
                    <Image
                      src="/assets/images/icons/attend.svg"
                      alt="attandance-icon"
                      width={25}
                      height={25}
                    />
                    <a>Attandance</a>
                  </div>
                </Link>
              </li>
            </div>
          </div>
          <button onClick={handleLogout} className="admin-btn">
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
}
