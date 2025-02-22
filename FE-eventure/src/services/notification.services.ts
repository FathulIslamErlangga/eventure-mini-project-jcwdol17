import api from "@/utils/api/axios";
import { notificationResponse } from "../utils/interfaces/customInsterface";
export const getNotification = async () => {
  try {
    const response = await api.get<notificationResponse>("/notification/v2");
    return response.data;
  } catch (error) {
    throw error;
  }
};
