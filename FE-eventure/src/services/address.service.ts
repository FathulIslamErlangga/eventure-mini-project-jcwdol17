import api from "@/utils/api/axios";
import { addressResponse } from "@/utils/interfaces/customInsterface";

export const getAddress = async () => {
  try {
    const response = await api.get<addressResponse>("/address/v2");
    return response.data;
  } catch (error) {
    throw error;
  }
};
