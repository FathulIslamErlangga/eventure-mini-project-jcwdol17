"use client";

import React, { createContext, useContext } from "react";
import authHooks from "@/hooks/auth.hooks";

import profileHooks from "@/hooks/profile.hooks";
import { AllProps } from "@/utils/interfaces/contextsInterface";
import eventsHooks from "@/hooks/events.hooks";
import categoriesHooks from "@/hooks/categories.hooks";

const AuthContext = createContext<AllProps | undefined>(undefined);

export const AuthContexts = ({ children }: { children: React.ReactNode }) => {
  const auth = authHooks();
  const profilesUser = profileHooks();
  const events = eventsHooks();
  const categories = categoriesHooks();

  return (
    <AuthContext.Provider value={{ auth, profilesUser, events, categories }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan dalam AuthContexts");
  }
  return context;
};
