import { createEvents, getEvents } from "@/services/events.services";
import { eventsProps } from "@/utils/interfaces/contextsInterface";
import { eventsResponse, getEvent } from "@/utils/interfaces/customInsterface";
import { useEffect, useState} from "react";

const eventsHooks = (): eventsProps => {
  const [event, setEvent] = useState<eventsResponse>();
  const [getevent, setEvents] = useState<getEvent>();
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

  return {
    event,
    getevent,
    message,
    loading,
    error,
    eventsCreated,
    getEventData
  };
};

export default eventsHooks;
