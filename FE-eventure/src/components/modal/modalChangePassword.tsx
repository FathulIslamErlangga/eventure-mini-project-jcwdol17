import { IUpdatedPassword } from "@/utils/interfaces/customInsterface";
import Image from "next/image";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; // Import toast
import "@/css/modal.css";

type ModalForm = {
  isOpen: boolean;
  showPassword: boolean;
  message: string | undefined;
  passwordChange: IUpdatedPassword;
  onClose: () => void;
  togglePasswordVisibility: () => void;
};

const ModalChangePassword = ({
  isOpen,
  onClose,
  message,
  showPassword,
  passwordChange,
  togglePasswordVisibility,
}: ModalForm) => {
  const formik = useFormik({
    initialValues: {
      oldPassword: passwordChange.oldPassword,
      newPassword: passwordChange.newPassword,
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      // Simulate a save password request
      try {
        // Here you would typically call your API to save the password
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
        toast.success("Password saved successfully!"); // Show success toast
      } catch (error) {
        toast.error("Failed to save password."); // Show error toast
      } finally {
        setSubmitting(false); // Reset submitting state
      }
    },
  });

  return (
    <>
      {isOpen && (
        <div className="emodal absolute mx-auto -top-10 bg-transparent ">
          <div className="emodal-content">
            <div className="emodal-close" onClick={onClose}>
              <div className="emodal-btn-close">
                <Image
                  src="/assets/images/icons/close.svg"
                  alt="close"
                  width={15}
                  height={15}
                />
              </div>
            </div>
            <div className="forgot-password-title">
              <span>Forgot Password</span>
            </div>
            <form className="eventure-form" onSubmit={formik.handleSubmit}>
              <label className="input input-bordered border-[3px] border-[#04002D] flex items-center gap-2 p-7">
                <input
                  type="password"
                  name="oldPassword"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Input old Password"
                />
                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                  <div>{formik.errors.oldPassword}</div>
                ) : null}
              </label>
              <label className="input input-bordered border-[3px] border-[#04002D] flex items-center gap-2 p-7">
                <input
                  type="password"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Input New Password"
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div>{formik.errors.newPassword}</div>
                ) : null}
                <button
                  className="btn-show-hide-pwd"
                  onClick={togglePasswordVisibility}
                >
                  {/* Password visibility toggle SVG */}
                </button>
              </label>

              <button
               className={`eventure-button ${
                formik.isSubmitting ? "cursor-wait opacity-50" : ""
              }`}
                type="submit"
                disabled={formik.isSubmitting} // Disable button while submitting
              >
                {formik.isSubmitting ? "Saving..." : "Save Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalChangePassword;