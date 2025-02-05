"use client";
import { useAuth } from "@/components/contexts/AuthContexts";
import { Role } from "@/utils/interfaces/interfaces";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

interface IProtectedRoute {
  children: ReactNode;
}
interface IProtectedRole {
  children: ReactNode;
  allowedRole: string;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const { user, loading, isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      setTimeout(() => router.push("/signin"), 1000);
    }
  }, [user, loading]);

  return isAuth === true ? (
    <>{children}</>
  ) : (
    <h1 className="text-center py-64 text-2xl font-semibold">error guys</h1>
  );
};

const GuardRole = ({ children, allowedRole }: IProtectedRole) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (allowedRole && !allowedAccsess(allowedRole)) {
      setTimeout(() => router.push("/"), 1000);
    }
  }, [allowedRole, user]);

  const allowedAccsess = (role: string) => {
    return user?.data.role === role;
  };

  return allowedAccsess(allowedRole) ? (
    <>{children}</>
  ) : (
    <h1 className="text-center py-64 text-2xl font-semibold">error guys</h1>
  );
};

export { ProtectedRoute, GuardRole };
