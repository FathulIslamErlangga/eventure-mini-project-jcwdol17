import api from "@/utils/api/axios";
import {
  IChangePassword,
  UserResponse,
} from "@/utils/interfaces/authInterface";
import { getCookie } from "cookies-next";

export const verifyEmail = async (token: string) => {
  return api.get(`/verify-email?token=${token}`);
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post<UserResponse>("/auth/v5", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changesPassword = async (data: IChangePassword) => {
  try {
    const token = getCookie("jwt");
    console.log("get Token forgot:", token);
    const response = await api.patch<UserResponse>(
      `/forgot-passwords?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
