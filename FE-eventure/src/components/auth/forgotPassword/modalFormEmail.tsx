import React from "react";

interface ModalForm {
  isOpen: boolean;
  message: string | undefined;
  email: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMailForgot: (e: React.FormEvent) => void;
}

const ModalForm = ({
  isOpen,
  message,
  email,
  handleChange,
  handleSendMailForgot,
}: ModalForm) => {
  return (
    <>
      {isOpen && (
        <div className="bg-red-300 rounded-md py-28">
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

          <form
            className="max-w-md mx-auto mt-10"
            onSubmit={handleSendMailForgot}
          >
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Input Email"
            />

            <button className="bg-black text-white rounded-md" type="submit">
              Send Mail
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ModalForm;
