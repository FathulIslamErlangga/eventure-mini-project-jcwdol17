import { updatedProfile } from "@/services/profile.services";
import { profilesProps } from "@/utils/interfaces/contextsInterface";
import {
  IProfileResponse,
  IUpdatedProfile,
} from "@/utils/interfaces/customInsterface";

import React, { useState } from "react";

const profileHooks = (): profilesProps => {
  const [profiles, setProfiles] = useState<IProfileResponse>();
  const [message, setMessage] = useState<string | undefined>("");

  const profile = async (data: IUpdatedProfile, slug: string) => {
    try {
      const response = await updatedProfile(data, slug);
      setProfiles(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };

  return {
    profiles,
    message,
    profile,
  };
};

export default profileHooks;
