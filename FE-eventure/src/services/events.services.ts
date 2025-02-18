import api from "@/utils/api/axios";
import { eventsResponse } from "@/utils/interfaces/customInsterface";
import { getEvent } from "../utils/interfaces/customInsterface";

export const createEvents = async (create: FormData) => {
  try {
    const response = await api.post<eventsResponse>("/events/v1", create, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response create:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await api.get<getEvent>("/events/v2");
    console.log("response get:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
