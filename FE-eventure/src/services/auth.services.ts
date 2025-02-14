import api from "@/utils/api/axios";
import {
  LoginData,
  RegisterData,
  UserResponse,
} from "@/utils/interfaces/customInsterface";
import { CookieValueTypes } from "cookies-next";

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
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await api.post<UserResponse>("/auth/v2", data);
    console.log(response.status);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
    throw error;
  }
};

export const getUser = async (token: CookieValueTypes) => {
  try {
    const response = await api.get<UserResponse>("/auth/v3", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.get("/auth/v4");
    return response.data;
  } catch (error) {
    throw error;
  }
};
