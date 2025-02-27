import {
  createEvents,
  deleteEvents,
  getEvents,
  getEventsSlug,
  updateEvents,
} from "@/services/events.services";
import { eventsProps } from "@/utils/interfaces/contextsInterface";
import {
  eventsResponse,
  getEvent,
  Meta,
} from "@/utils/interfaces/customInsterface";
import { useEffect, useState } from "react";

const eventsHooks = (): eventsProps => {
  const [event, setEvent] = useState<eventsResponse>();
  const [getevent, setEvents] = useState<getEvent>();
  const [eventBySlug, setEventBySlug] = useState<getEvent>();
  const [message, setMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const eventsCreated = async (create: FormData) => {
    try {
      const response = await createEvents(create);
      console.log("created events:", response);
      setEvent(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };

  const getEventData = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEvents(page);
      console.log("response get:", response);
      setEvents(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventData(1);
  }, []);

  const getEventBySlug = async (slug: string): Promise<eventsResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEventsSlug(slug);
      console.log("response get by slug:", response);

      // Convert eventsResponse to getEvent
      const getEventResponse: getEvent = {
        message: response.message,
        data: [response.data], // Wrap single event in array
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
          perPage: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };

      setEventBySlug(getEventResponse);
      setMessage(response.message);
      return response;
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
        setError(error.response.data.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (slug: string, update: FormData) => {
    try {
      const response = await updateEvents(slug, update);
      console.log("updated events:", response);
      setEvent(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };

  const deleteEvent = async (slug: string) => {
    try {
      const response = await deleteEvents(slug);
      console.log("deleted events:", response);
      setEvent(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };

  return {
    event,
    getevent,
    message,
    setMessage,
    loading,
    error,
    eventsCreated,
    getEventData,
    getEventBySlug,
    updateEvent,
    deleteEvent,
  };
};

export default eventsHooks;
