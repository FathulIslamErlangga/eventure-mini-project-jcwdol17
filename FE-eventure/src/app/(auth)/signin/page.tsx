"use client";
import ModalForm from "@/components/auth/forgotPassword/modalFormEmail";
import { useAuth } from "@/components/contexts/AuthContexts";
import { LoginData } from "@/utils/interfaces/authInterface";
import { useRouter } from "next/navigation"; // Gunakan next/navigation untuk query params
import React, { useState } from "react";

const SignIn = () => {
  const {
    login,
    message,
    onClickModal: onClickModal,
    isOpen,
    forgot,
  } = useAuth();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const handleChangeForgot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
    setTimeout(() => router.push("/profile"), 1000);
  };
  const handleSendMailForgot = async (e: React.FormEvent) => {
    e.preventDefault();

    await forgot(email);
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold">Register</h2>
      {message && (
        <div
          className={`text-center mt-4 p-2 rounded ${
            message.toLowerCase().includes("error")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      <button className="border-none" onClick={onClickModal}>
        Forgot Password
      </button>
      <ModalForm
        isOpen={isOpen}
        handleChange={handleChangeForgot}
        handleSendMailForgot={handleSendMailForgot}
        message={message}
        email={email}
      />
    </div>
  );
};

export default SignIn;
