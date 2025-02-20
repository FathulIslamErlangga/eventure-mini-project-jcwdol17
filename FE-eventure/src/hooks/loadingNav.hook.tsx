// hooks/useLoadingNavigation.ts
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingPage } from '@/components/loadingPage';

interface UseLoadingNavigationOptions {
  delay?: number;
  onComplete?: () => void;
}

export function useLoadingNavigation(options: UseLoadingNavigationOptions = {}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { delay = 1000, onComplete } = options;

  const navigateWithLoading = (path: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      router.push(path);
      setIsLoading(false);
      onComplete?.();
    }, delay);
  };

  const LoadingWrapper: React.FC = () => {
    return isLoading ? <LoadingPage /> : null;
  };

  return {
    navigateWithLoading,
    isLoading,
    LoadingWrapper
  };
}