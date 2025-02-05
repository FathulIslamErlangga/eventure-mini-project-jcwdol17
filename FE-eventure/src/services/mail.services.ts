import api from "@/utils/api/axios";
import { UserResponse } from "@/utils/interfaces/authInterface";

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
