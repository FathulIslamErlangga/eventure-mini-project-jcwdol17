import api from "@/utils/api/axios";
import { eventsResponse, getEvent } from "@/utils/interfaces/customInsterface";

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

export const getEvents = async (page: number = 1) => {
  try {
    const response = await api.get<getEvent>(`/events/v2?page=${page}`);
    console.log("response get:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEventsSlug = async (slug: string): Promise<eventsResponse> => {
  try {
    const response = await api.get<eventsResponse>(`/events/v3/${slug}`);
    console.log("response get:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEvents = async (slug: string, update: FormData) => {
  try {
    const response = await api.patch<eventsResponse>(`/events/v4/${slug}`, update, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response update:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvents = async (slug: string) => {
  try {
    const response = await api.delete<eventsResponse>(`/events/v5/${slug}`);
    console.log("deleted events:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

