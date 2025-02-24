"use client";
import Image from "next/image";
import "@/css/modal.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; // Import toast

interface ModalReviewProps {
  onClose: () => void;
}

export function ModalReview({ onClose }: ModalReviewProps) {
  const formik = useFormik({
    initialValues: {
      rating: 0,
      description: '',
    },
    validationSchema: Yup.object({
      rating: Yup.number().required("Rating is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      // Simulate a review submission request
      try {
        // Here you would typically call your API to submit the review
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
        toast.success("Review submitted successfully!"); // Show success toast
      } catch (error) {
        toast.error("Failed to submit review."); // Show error toast
      } finally {
        setSubmitting(false); // Reset submitting state
      }
    },
  });

  return (
    <div className="emodal3">
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
          <span>Review</span>
        </div>
        <form className="eventure-form gap-8" onSubmit={formik.handleSubmit}>
          <div className="w-full h-fit flex items-center justify-center">
            <div className="rating rating-lg">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  value={star}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              ))}
            </div>
            {formik.touched.rating && formik.errors.rating ? (
              <div>{formik.errors.rating}</div>
            ) : null}
          </div>
          <textarea
            className="border-[2.5px] border-[#04002D] textarea textarea-bordered"
            placeholder="Event Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}

          <button
            className={`eventure-button ${
              formik.isSubmitting ? "cursor-wait opacity-50" : ""
            }`}
            type="submit"
            disabled={formik.isSubmitting} // Disable button while submitting
          >
            {formik.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}