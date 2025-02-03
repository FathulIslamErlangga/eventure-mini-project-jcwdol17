import api from "@/utils/api/axios";
import {
  LoginData,
  RegisterData,
  UserResponse,
} from "@/utils/interfaces/authInterface";
import { IUsers } from "@/utils/interfaces/interfaces";
import { getCookie } from "cookies-next";

export const registerUser = async (data: RegisterData) => {
  try {
    const payload = { ...data };
    delete payload.code;

    console.log(" Data pendding:", data);
    const response = await api.post<UserResponse>("/auth/v1", payload, {
      params: data.code ? { code: data.code } : {},
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export const verifyEmail = async (token: string) => {
  return api.get(`/verify-email?token=${token}`);
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await api.post<UserResponse>("/auth/v2", data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export const getUser = async () => {
  try {
    const token = getCookie("jwt");
    const response = await api.get<UserResponse>("/auth/v3", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
