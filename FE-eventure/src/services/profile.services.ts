import api from "@/utils/api/axios";
import {
  IProfileResponse,
  IUpdatedPassword,
} from "@/utils/interfaces/customInsterface";

export const updatedProfile = async (data: FormData, slug: string) => {
  try {
    const response = await api.patch<IProfileResponse>(
      `/profiles/v2/${slug}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updatePassword = async (data: IUpdatedPassword, slug: string) => {
  try {
    const response = await api.patch<IProfileResponse>(
      `/profiles/v3/${slug}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
