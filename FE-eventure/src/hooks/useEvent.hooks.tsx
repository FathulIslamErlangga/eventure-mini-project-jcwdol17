import { useAuth } from "@/components/contexts/AuthContexts";
import { createEvents } from "@/utils/interfaces/customInsterface";
import React, { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

const useEvent = () => {
  const { events, categories } = useAuth();
  const [formEvent, setFormEvent] = useState<createEvents>({
    name: "",
    description: "",
    address: "",
    city: "",
    price: "",
    availableSeats: "",
    cover: "",
    thumbnail: "",
    categoryId: "",
  });

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      if (name === "cover") {
        setFormEvent({ ...formEvent, cover: imageUrl });
      } else if (name === "thumbnail") {
        setFormEvent({ ...formEvent, thumbnail: imageUrl });
      }
    }
  };
  const handleChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormEvent({ ...formEvent, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting form...");

    // Validation checks
    const errors: string[] = [];

    if (!formEvent.name.trim()) {
      errors.push("Event Name is required");
    }

    if (!formEvent.categoryId) {
      errors.push("Please select a category");
    }

    if (!startDate || !endDate) {
      errors.push("Start and End dates are required");
    } else if (startDate > endDate) {
      errors.push("Start date must be before End date");
    }

    if (!formEvent.address.trim()) {
      errors.push("Address is required");
    }

    if (!formEvent.city.trim()) {
      errors.push("City is required");
    }

    if (!formEvent.price || Number(formEvent.price) < 0) {
      errors.push("Valid price is required");
    }

    if (!formEvent.availableSeats || Number(formEvent.availableSeats) <= 0) {
      errors.push("Available seats must be greater than 0");
    }

    if (!formEvent.description.trim()) {
      errors.push("Event description is required");
    }

    if (!fileInputRef.current?.files?.[0]) {
      errors.push("Event cover and thumbnail are required");
    }

    // If there are validation errors, show them and return
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", formEvent.name);
      formData.append("description", formEvent.description);
      formData.append("price", String(Number(formEvent.price)));
      formData.append(
        "availableSeats",
        String(Number(formEvent.availableSeats))
      );
      formData.append(
        "startDate",
        startDate ? new Date(startDate).toISOString() : new Date().toISOString()
      );
      formData.append(
        "endDate",
        endDate ? new Date(endDate).toISOString() : new Date().toISOString()
      );
      if (fileInputRef.current?.files?.[0]) {
        formData.append("cover", fileInputRef.current.files[0]);
        formData.append("thumbnail", fileInputRef.current.files[0]);
      }

      formData.append("address[address]", formEvent.address);
      formData.append("address[city]", formEvent.city);
      formData.append("categoryId", formEvent.categoryId);

      const response = await events.eventsCreated(formData);

      // Show success toast
      toast("Event created successfully!");

      // Reset form after successful submission
      setFormEvent({
        name: "",
        description: "",
        address: "",
        city: "",
        price: "",
        availableSeats: "",
        cover: "",
        thumbnail: "",
        categoryId: "",
      });
      setStartDate(new Date());
      setEndDate(new Date());
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      // Show error toast
      toast.error(
        `Failed to create event: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formEvent,
    startDate,
    endDate,
    events,
    categories,
    fileInputRef,
    setStartDate,
    setEndDate,
    handleChangeFile,
    handleChangeInput,
    handleSubmit,
    isLoading,
    setFormEvent,
  };
};

export default useEvent;
