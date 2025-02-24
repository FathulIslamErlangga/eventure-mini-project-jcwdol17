"use client";
import Image from "next/image";
import "@/css/modal.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; // Import toast

interface ModalAddPromotionsProps {
  onClose: () => void;
}

export function ModalAddPromotions({ onClose }: ModalAddPromotionsProps) {
  const formik = useFormik({
    initialValues: {
      code: '',
      startDate: '',
      endDate: '',
      discount: 0,
      usageLimit: 0,
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Promotion code is required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date().required("End date is required"),
      discount: Yup.number().required("Discount is required").min(0, "Discount must be at least 0"),
      usageLimit: Yup.number().required("Usage limit is required").min(1, "Usage limit must be at least 1"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      // Simulate a promotion submission request
      try {
        // Here you would typically call your API to submit the promotion
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
        toast.success("Promotion added successfully!"); // Show success toast
      } catch (error) {
        toast.error("Failed to add promotion."); // Show error toast
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
          <span>Promotions</span>
        </div>
        <form className="eventure-form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Code
              <input
                type="text"
                className="grow"
                placeholder="Music Concert"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.code && formik.errors.code ? (
              <div>{formik.errors.code}</div>
            ) : null}
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Start Date
              <input
                type="date"
                className="grow"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.startDate && formik.errors.startDate ? (
              <div>{formik.errors.startDate}</div>
            ) : null}
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              End Date
              <input
                type="date"
                className="grow"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.endDate && formik.errors.endDate ? (
              <div>{formik.errors.endDate}</div>
            ) : null}
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Discount
              <input
                type="number"
                className="grow"
                placeholder="1000000"
                name="discount"
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.discount && formik.errors.discount ? (
              <div>{formik.errors.discount}</div>
            ) : null}
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Usage Limit
              <input
                type="number"
                className="grow"
                placeholder="100"
                name="usageLimit"
                value={formik.values.usageLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.usageLimit && formik.errors.usageLimit ? (
              <div>{formik.errors.usageLimit}</div>
            ) : null}
          </div>
          <button
            className={`eventure-button ${formik.isSubmitting ? "cursor-wait opacity-50" : ""}`}
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