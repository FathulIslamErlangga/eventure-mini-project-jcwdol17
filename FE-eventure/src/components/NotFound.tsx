"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import "@/css/NotFound.css";

interface NotFoundProps {
  message?: string;
  redirectUrl?: string;
}

export function NotFoundPage({
  message = "Page Not Found",
  redirectUrl,
}: NotFoundProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Determine the default redirect URL based on the current path
  const defaultRedirectUrl = pathname.startsWith("/admin")
    ? "/admin"
    : "/";

  // Use the provided redirectUrl or the default
  const finalRedirectUrl = redirectUrl || defaultRedirectUrl;

  // Handle redirect with loading state
  const handleRedirect = () => {
    setIsLoading(true);
    router.push(finalRedirectUrl);
  };

  return (
    <div className="no-data">
      <div className="no-data-content">
        <div className="no-data-icon">
          <span>404</span>
        </div>
        <div className="no-data-text">
          <h1>{message}</h1>
          <button
            onClick={handleRedirect}
            disabled={isLoading}
            className={`e-btn-back ${
              isLoading ? "cursor-wait opacity-50" : ""
            }`}
          >
            {isLoading
              ? "Redirecting..."
              : finalRedirectUrl === "/admin"
              ? "Back to Admin Dashboard"
              : finalRedirectUrl === "/"
              ? "Back to Home"
              : "Back to Previous Page"}

            {isLoading && <span className="ml-2 animate-spin text-base-100">⟳</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
