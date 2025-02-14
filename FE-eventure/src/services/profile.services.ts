import api from "@/utils/api/axios";
import {
  IProfileResponse,
  IUpdatedProfile,
} from "@/utils/interfaces/customInsterface";

export const updatedProfile = async (data: FormData, slug: string) => {
  try {
    // console.log("File dalam FormData:", data.get("file"));
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
