"use client";
import "@/css/adminPage/eventsPage/eventsDetPage.css";
import withAuth from "@/middlewares/auth.middleware";
import useEvent from "@/hooks/useEvent.hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default withAuth(
  function AdminEventDetailsPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const {
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
      events,
      setFormEvent,
    } = useEvent();

    const [isEditMode, setIsEditMode] = useState(false);

    const [viewImageModal, setViewImageModal] = useState<{
      isOpen: boolean;
      imageUrl: string;
      type: "cover" | "thumbnail";
    }>({
      isOpen: false,
      imageUrl: "",
      type: "cover",
    });

    const openImageModal = (imageUrl: string, type: "cover" | "thumbnail") => {
      setViewImageModal({
        isOpen: true,
        imageUrl,
        type,
      });
    };

    const closeImageModal = () => {
      setViewImageModal({
        isOpen: false,
        imageUrl: "",
        type: "cover",
      });
    };

    useEffect(() => {
      const fetchEventDetails = async () => {
        if (slug && slug !== "create") {
          try {
            const eventResponse = await events.getEventBySlug(slug);
            const eventData = eventResponse.data;

            console.log("Full Event Data:", JSON.stringify(eventData, null, 2));

            // Populate form with existing event data
            setFormEvent({
              name: eventData.name || "",
              description: eventData.description || "",
              address: eventData.address?.address || "",
              city: eventData.address?.city || "",
              price: String(eventData.price || 0),
              availableSeats: String(eventData.availableSeats || 0),
              cover: eventData.gallery?.[0]?.imageUrl || "",
              thumbnail: eventData.gallery?.[1]?.imageUrl || "",
              categoryId: String(eventData.category?.id || ""),
            });

            // Set start and end dates
            setStartDate(new Date(eventData.startDate));
            setEndDate(new Date(eventData.endDate));

            setIsEditMode(true);
          } catch (error) {
            console.error("Error fetching event details:", error);
          }
        }
      };

      fetchEventDetails();
    }, [slug]);

    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (e?: React.FormEvent) => {
      // Prevent default form submission if event is passed
      if (e) {
        e.preventDefault();
      }

      // Prevent submission if already loading
      if (isLoading) return;

      // Validate file uploads differently for create and edit modes
      const files = fileInputRef.current?.files;

      if (!isEditMode) {
        // For create mode, files are mandatory
        if (!files || files.length === 0) {
          toast.error("Cover and thumbnail images are required");
          return;
        }
      }

      // Set loading state
      setIsLoading(true);

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

      // Handle file uploads differently for create and edit modes
      if (files && files.length > 0) {
        // Validate file types and sizes
        const coverFile = files[0];
        const thumbnailFile = files[1] || coverFile;

        // Validate file types
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        const maxFileSize = 5 * 1024 * 1024; // 5MB

        const validateFile = (file: File, fileType: "cover" | "thumbnail") => {
          if (!validImageTypes.includes(file.type)) {
            toast.error(
              `${
                fileType.charAt(0).toUpperCase() + fileType.slice(1)
              } image must be a valid image type (JPEG, PNG, GIF)`
            );
            return false;
          }

          if (file.size > maxFileSize) {
            toast.error(
              `${
                fileType.charAt(0).toUpperCase() + fileType.slice(1)
              } image must be less than 5MB`
            );
            return false;
          }

          return true;
        };

        // Validate both cover and thumbnail
        if (!validateFile(coverFile, "cover")) {
          setIsLoading(false);
          return;
        }
        if (
          thumbnailFile !== coverFile &&
          !validateFile(thumbnailFile, "thumbnail")
        ) {
          setIsLoading(false);
          return;
        }

        // Append files
        formData.append("cover", coverFile);
        formData.append("thumbnail", thumbnailFile);
      }

      formData.append("address[address]", formEvent.address);
      formData.append("address[city]", formEvent.city);
      formData.append("categoryId", formEvent.categoryId);

      // Generate a unique slug if in create mode
      if (!isEditMode) {
        const uniqueSlug = `${formEvent.name
          .toLowerCase()
          .replace(/\s+/g, "-")}-${Date.now()}`;
        formData.append("slug", uniqueSlug);
      }

      // Log all form data entries
      console.log("Form Data Entries:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(
            `${key}: File (${value.name}, ${value.type}, ${value.size} bytes)`
          );
        } else {
          console.log(`${key}:`, value);
        }
      }

      // Optional: Convert FormData to a plain object for easier viewing
      const formDataObject: { [key: string]: any } = {};
      for (let [key, value] of formData.entries()) {
        formDataObject[key] = value;
      }
      console.log("Form Data Object:", formDataObject);

      try {
        let response;
        if (isEditMode && slug && slug !== "create") {
          // Use updateEvent hook for editing events
          response = await events.updateEvent(slug, formData);
          toast.success("Event updated successfully!");
        } else {
          // Create new event
          response = await events.eventsCreated(formData);
          toast.success("Event created successfully!");
        }

        // Optional: handle response if needed
        console.log("Submission response:", response);

        // Optional: redirect or reset form
        // router.push('/events'); // Uncomment if you want to redirect
      } catch (error: any) {
        console.error("Submission error:", error);

        // More detailed error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          toast.error(error.response.data.message || "Submission failed");
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response received from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("Error setting up the request");
        }
      } finally {
        // Always reset loading state
        setIsLoading(false);
      }
    };

    return (
      <div className="admin-event-details">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="admin-event-details-title">
          <span>{isEditMode ? "Edit Event" : "Create Event"}</span>
        </div>
        <div className="admin-event-details-content">
          <form className="eventure-form" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
                Event Name
                <input
                  type="text"
                  className="grow"
                  placeholder="Music Concert"
                  name="name"
                  value={formEvent.name}
                  onChange={handleChangeInput}
                />
              </label>
              <select
                className="select select-bordered w-full border-[2.5px] border-[#04002D]"
                name="categoryId"
                onChange={handleChangeInput}
                value={formEvent.categoryId}
              >
                <option value="">Select a category</option>
                {categories.category?.data.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
                Start Date
                <DatePicker
                  selected={startDate}
                  className="grow"
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                />
              </label>
              <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
                End Date
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="grow"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                />
              </label>
              <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
                Address
                <input
                  type="text"
                  className="grow"
                  placeholder="Jl. Raya No. 123"
                  name="address"
                  value={formEvent.address}
                  onChange={handleChangeInput}
                />
              </label>
              <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
                City
                <input
                  type="text"
                  className="grow"
                  placeholder="Badung"
                  name="city"
                  value={formEvent.city}
                  onChange={handleChangeInput}
                />
              </label>
              <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
                Price (IDR)
                <input
                  type="number"
                  className="grow"
                  placeholder="1000000"
                  name="price"
                  value={formEvent.price}
                  onChange={handleChangeInput}
                />
              </label>
              <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
                Available Seat
                <input
                  type="number"
                  className="grow"
                  placeholder="100"
                  name="availableSeats"
                  value={formEvent.availableSeats}
                  onChange={handleChangeInput}
                />
              </label>
              <textarea
                className="border-[2.5px] border-[#04002D] textarea textarea-bordered"
                placeholder="Event Description"
                name="description"
                value={formEvent.description}
                onChange={handleChangeInput}
              ></textarea>
              <div className="flex flex-col gap-2">
                <label className="form-control w-full flex gap-2">
                  <div className="label">
                    <span className="label-text">Pick a Event Picture</span>
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full border-[2.5px] border-[#04002D]"
                    name="cover"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleChangeFile}
                  />
                  {formEvent.cover && (
                    <button
                      type="button"
                      onClick={() => openImageModal(formEvent.cover, "cover")}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      View
                    </button>
                  )}
                </label>
                <label className="form-control w-full flex gap-2">
                  <div className="label">
                    <span className="label-text">
                      Pick a Thumnail Event Picture
                    </span>
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full border-[2.5px] border-[#04002D]"
                    name="thumbnail"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleChangeFile}
                  />
                  {formEvent.thumbnail && (
                    <button
                      type="button"
                      onClick={() =>
                        openImageModal(formEvent.thumbnail, "thumbnail")
                      }
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      View
                    </button>
                  )}
                </label>
              </div>
            </div>
            <button
              className={`eventure-button ${
                isLoading ? "cursor-wait opacity-50" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Submitting..."
                : isEditMode
                ? "Update Event"
                : "Create Event"}
            </button>
          </form>
        </div>
        {viewImageModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg max-w-xl w-full relative">
              <button
                onClick={closeImageModal}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4 capitalize">
                {viewImageModal.type} Image
              </h2>
              <img
                src={viewImageModal.imageUrl}
                alt={`${viewImageModal.type} image`}
                className="max-w-full max-h-[70vh] mx-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    );
  },
  ["ORGANIZER"]
);
