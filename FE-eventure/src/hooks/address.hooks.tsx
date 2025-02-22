import { getAddress } from "@/services/address.services";
import { addressProps } from "@/utils/interfaces/contextsInterface";
import { addressResponse } from "@/utils/interfaces/customInsterface";
import React, { useEffect, useState } from "react";

type Props = {};

const addressHooks = (): addressProps => {
  const [address, setAddress] = useState<addressResponse>();
  const [message, setMessage] = useState<string | undefined>("");

  useEffect(() => {
    addresses();
  }, []);

  const addresses = async () => {
    try {
      const response = await getAddress();
      setAddress(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };

  return {
    address,
    message,
  };
};

export default addressHooks;
