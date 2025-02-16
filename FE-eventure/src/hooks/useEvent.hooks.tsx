import { useAuth } from "@/components/contexts/AuthContexts";
import { createEvents } from "@/utils/interfaces/customInsterface";
import React, { FormEvent, useRef, useState } from "react";

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
    console.log("Submitting form...");

    if (!startDate || !endDate) {
      alert("Pastikan tanggal mulai dan tanggal selesai diisi dengan benar.");
      return;
    }
    const formData = new FormData();
    formData.append("name", formEvent.name);
    formData.append("description", formEvent.description);
    formData.append("price", String(Number(formEvent.price)));
    formData.append("availableSeats", String(Number(formEvent.availableSeats)));
    formData.append("startDate", new Date(startDate).toISOString());
    formData.append("endDate", new Date(endDate).toISOString());
    if (fileInputRef.current?.files?.[0]) {
      formData.append("cover", fileInputRef.current.files[0]);
      formData.append("thumbnail", fileInputRef.current.files[0]);
    }

    formData.append("address[address]", formEvent.address);
    formData.append("address[city]", formEvent.city);
    formData.append("categoryId", formEvent.categoryId);
    console.log("Data yang Dikirim:", Object.fromEntries(formData.entries()));
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    await events.eventsCreated(formData);
  };

  return {
    formEvent,
    startDate,
    endDate,
    categories,
    fileInputRef,
    setStartDate,
    setEndDate,
    handleChangeFile,
    handleChangeInput,
    handleSubmit,
  };
};

export default useEvent;
