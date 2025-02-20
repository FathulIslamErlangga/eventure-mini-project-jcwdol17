"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoadingPage } from "@/components/loadingPage";

interface UseLoadingNavigationOptions {
  delay?: number;
  onComplete?: () => void;
}

export function useLoadingNavigation(
  options: UseLoadingNavigationOptions = {}
) {
  const router = useRouter();
  const pathname = usePathname(); // Menggunakan pathname untuk mendeteksi perubahan halaman
  const [isLoading, setIsLoading] = useState(false);
  const { delay = 1000, onComplete } = options;

  const navigateWithLoading = (path: string) => {
    setIsLoading(true);

    setTimeout(() => {
      router.push(path);
    }, delay);
  };

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      onComplete?.();
    }
  }, [pathname, onComplete]); // Memantau perubahan pathname untuk reset loading

  const LoadingWrapper: React.FC = () => {
    return isLoading ? <LoadingPage /> : null;
  };

  return {
    navigateWithLoading,
    isLoading,
    LoadingWrapper,
  };
}
