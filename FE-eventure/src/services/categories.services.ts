import api from "@/utils/api/axios";
import { categoriesResponse } from "@/utils/interfaces/customInsterface";

export const getCategories = async () => {
  try {
    const response = await api.get<categoriesResponse>("/categories/v2");
    return response.data;
  } catch (error) {
    throw error;
  }
};
