import { useState } from "react";
import "@/css/modal.css";
import Image from "next/image";

interface ModalForm {
  isOpen: boolean;
  onClose: () => void;
  message: string | undefined;
  email: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMailForgot: (e: React.FormEvent) => void;
}



const ModalForm = ({
  isOpen,
  onClose,
  message,
  email,
  handleChange,
  handleSendMailForgot,
}: ModalForm) => {
  return (
    <>
      {isOpen && (
        <div className="emodal">
          {message && (
            <div
              className={`text-center mt-4 p-2 rounded ${
                message.toLowerCase().includes("error")
                  ? "bg-green-200 text-green-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {message}
            </div>
          )}
          <div className="emodal-content">
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
            <div className="forgot-password-title">
              <span>Forgot Password</span>
            </div>
            <form className="eventure-form" onSubmit={handleSendMailForgot}>
              <label className="input input-bordered border-[3px] border-[#04002D] flex items-center gap-2 p-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                />
              </label>

              <button className="eventure-button" type="submit">
                Send Mail
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForm;
