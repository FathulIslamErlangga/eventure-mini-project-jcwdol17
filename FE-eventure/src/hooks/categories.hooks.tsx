import { getCategories } from "@/services/categories.services";
import { categoriesProps } from "@/utils/interfaces/contextsInterface";
import { categoriesResponse } from "@/utils/interfaces/customInsterface";
import React, { useEffect, useState } from "react";

type Props = {};

const categoriesHooks = (): categoriesProps => {
  const [category, setCategory] = useState<categoriesResponse>();
  const [message, setMessage] = useState<string | undefined>("");

  useEffect(() => {
    categories();
  }, []);

  const categories = async () => {
    try {
      const response = await getCategories();
      setCategory(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      }
    }
  };

  return {
    category,
    message,
  };
};

export default categoriesHooks;
