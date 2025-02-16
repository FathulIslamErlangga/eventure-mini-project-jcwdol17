import { createEvents } from "@/services/events.services";
import { eventsProps } from "@/utils/interfaces/contextsInterface";
import { eventsResponse } from "@/utils/interfaces/customInsterface";
import { useState } from "react";

const eventsHooks = (): eventsProps => {
  const [event, setEvent] = useState<eventsResponse>();
  const [message, setMessage] = useState<string | undefined>("");

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
  return {
    event,
    message,
    eventsCreated,
  };
};

export default eventsHooks;
