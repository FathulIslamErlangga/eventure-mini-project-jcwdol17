import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/contexts/AuthContexts";

export const useAuthGuard = (allowedRoles: string[]) => {
  const { auth } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const loading = auth.loading;
  useEffect(() => {
    if (!auth.loading) {
      if (!auth.isAuth) {
        router.replace("/signin");
      } else if (!allowedRoles.includes(auth.user?.data.role as string)) {
        router.replace("/");
      } else {
        setIsAuthorized(true);
      }
    }
  }, [auth.isAuth, auth.loading, auth.user, allowedRoles, router]);

  return { isAuthorized, loading };
};
