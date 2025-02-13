import {
  UserResponse,
  IChangePassword,
  LoginData,
  RegisterData,
} from "@/utils/interfaces/customInsterface";
import { handleModalForgot } from "@/utils/useState";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "@/services/auth.services";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
  changesPassword,
  forgotPassword,
  verifyEmail,
} from "@/services/mail.services";
import { AuthProps } from "@/utils/interfaces/contextsInterface";

const authHooks = (): AuthProps => {
  const [user, setUser] = useState<UserResponse>();
  const [message, setMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const referral = searchParams.get("code") as string | undefined;
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
    } finally {
      setTimeout(() => setLoading(false), 1500);
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
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  };

  const getUsers = async (token: string) => {
    try {
      console.log("getUser token", token);
      const getData = await getUser(token as string);
      console.log("data dari cookies:", getData);
      setUser(getData);
      setLoading(true);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
        setUser(undefined);
      }
    } finally {
      setTimeout(() => setLoading(false), 1500);
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
  const forgot = async (email: string) => {
    try {
      const response = await forgotPassword(email);
      setCookie("jwt", response?.token, {
        secure:
          process.env.NEXT_PUBLIC_NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        path: "/",
      });
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };

  const changePassword = async (data: IChangePassword) => {
    try {
      const response = await changesPassword(data);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };
  const { isOpen, onClickModal } = handleModalForgot();
  return {
    user,
    message,
    loading,
    isAuth: !!user,
    isOpen,
    onClickModal,
    register,
    verificationEmail,
    login,
    logout,
    forgot,
    changePassword,
  };
};

export default authHooks;
