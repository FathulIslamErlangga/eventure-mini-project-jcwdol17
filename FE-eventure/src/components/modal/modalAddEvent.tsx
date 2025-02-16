"use client";
import Image from "next/image";
import "@/css/modal.css";
import useEvent from "@/hooks/useEvent.hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ModalAddEventProps {
  onClose: () => void;
}

export function ModalAddEvent({ onClose }: ModalAddEventProps) {
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
  } = useEvent();
  return (
    <div className="emodal2">
      <div className="emodal2-content">
        <div className="emodal-close">
          <div className="emodal-btn-close" onClick={onClose}>
            <Image
              src="/assets/images/icons/close.svg"
              alt="close"
              width={15}
              height={15}
            />
          </div>
        </div>
        <div className="emodal-title">
          <span>Event</span>
        </div>
        <form className="eventure-form" action="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Event Name
              <input
                type="text"
                className="grow"
                placeholder="Name Event"
                name="name"
                value={formEvent.name}
                onChange={handleChangeInput}
              />
            </label>
            <select
              className="select select-bordered w-full border-[2.5px] border-[#04002D]"
              name="categoryId"
              onChange={handleChangeInput}
            >
              <option value="">Select a category</option>
              {categories.category?.data.map((category) => (
                <>
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                </>
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
                placeholder="Address"
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
                placeholder="City"
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
              <label className="form-control w-full ">
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
              </label>
              <label className="form-control w-full">
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
              </label>
            </div>
          </div>
          <button
            className="eventure-button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
