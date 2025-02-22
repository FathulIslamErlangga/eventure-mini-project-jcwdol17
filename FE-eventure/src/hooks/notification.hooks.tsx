import { getNotification } from "@/services/notification.services";
import { notificationProps } from "@/utils/interfaces/contextsInterface";
import { notificationResponse } from "@/utils/interfaces/customInsterface";
import { useEffect, useState } from "react";

const notificationHooks = (): notificationProps => {
  const [notification, setNotification] = useState<notificationResponse>();
  const [message, setMessage] = useState("");
  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const response = await getNotification();
      setNotification(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };

  return {
    notification,
    message,
  };
};

export default notificationHooks;
