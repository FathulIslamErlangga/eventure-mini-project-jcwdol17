"use client";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "@/services/auth.services";
import {
  LoginData,
  RegisterData,
  responseApi,
  UserResponse,
} from "@/utils/interfaces/authInterface";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { verifyEmail } from "../../services/auth.services";

interface AuthProps {
  user: UserResponse | undefined;
  message: string | undefined;
  register: (data: RegisterData) => Promise<void>;
  verificationEmail: (token: string) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthContexts = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse>();
  const [message, setMessage] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const referral = searchParams.get("code") as string | undefined; // Dapatkan 'code' dari searchParams

  useEffect(() => {
    const token = getCookie("jwt");
    console.log("Token dari cookies:", token);
    if (token) {
      getUsers(token as string);
    }
  }, []);

  const register = async (data: RegisterData) => {
    try {
      if (referral) {
        data.code = referral;
      }
      const response = await registerUser(data);

      setUser(response);
      setCookie("jwt", response?.token, {
        secure:
          process.env.NEXT_PUBLIC_NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        path: "/",
      });

      setMessage(response?.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };

  const verificationEmail = async (token: string) => {
    await verifyEmail(token);
  };

  const login = async (data: LoginData) => {
    try {
      const response = await loginUser(data);
      if (response.status === "error") {
        setMessage(response.message); // Jika error, tampilkan pesan error
      }
      setUser(response);
      setCookie("jwt", response?.token, {
        secure:
          process.env.NEXT_PUBLIC_NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        path: "/",
      });
      console.log(response);
      setMessage(response?.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message); // Menampilkan pesan error ke UI
      }
    }
  };

  const getUsers = async (token: string) => {
    try {
      console.log("getUser token", token);
      const getData = await getUser(token as string);
      console.log("data dari cookies:", getData);
      setUser(getData);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
        setUser(undefined);
      }
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      deleteCookie("jwt");
      setUser(undefined);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, message, register, verificationEmail, login, logout }}
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
