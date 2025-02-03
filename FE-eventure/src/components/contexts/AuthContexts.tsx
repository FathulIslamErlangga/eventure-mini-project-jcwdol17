"use client";
import { loginUser, registerUser } from "@/services/auth.services";
import {
  LoginData,
  RegisterData,
  UserResponse,
} from "@/utils/interfaces/authInterface";
import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import { verifyEmail } from "../../services/auth.services";

interface AuthProps {
  user: UserResponse | undefined;
  message: string | undefined;
  register: (data: RegisterData) => Promise<void>;
  verificationEmail: (token: string) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthContexts = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse>();
  const [message, setMessage] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const referral = searchParams.get("code") as string | undefined; // Dapatkan 'code' dari searchParams

  const register = async (data: RegisterData) => {
    try {
      if (referral) {
        data.code = referral;
      }

      const response = await registerUser(data);
      if (response?.message) {
        setMessage(response.message);
      }
      setUser(response);
      setCookie("jwt", response?.token, {
        httpOnly: true,
        secure:
          process.env.NEXT_PUBLIC_NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      });
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  };

  const verificationEmail = async (token: string) => {
    await verifyEmail(token);
  };

  const login = async (data: LoginData) => {
    try {
      const response = await loginUser(data);
      
      setUser(response);
      setCookie("jwt", response?.token, {
        httpOnly: true,
        secure:
          process.env.NEXT_PUBLIC_NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      });
      setMessage(response?.message);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, message, register, verificationEmail, login }}
    >
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
