"use client";

import React, { createContext, useContext } from "react";
import authHooks from "@/hooks/auth.hooks";
import { AuthProps } from "@/utils/interfaces/authInterface";

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthContexts = ({ children }: { children: React.ReactNode }) => {
  const auth = authHooks();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan dalam AuthContexts");
  }
  return context;
};
