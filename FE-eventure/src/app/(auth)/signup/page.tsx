"use client";
import { useAuth } from "@/components/contexts/AuthContexts";
import { RegisterData } from "@/utils/interfaces/authInterface";
import { useSearchParams } from "next/navigation"; // Gunakan next/navigation untuk query params
import React, { useEffect, useState } from "react";

const SignUp = () => {
  const { register, message } = useAuth();
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    code: "",
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const referral = searchParams.get("code") || ""; // Ambil parameter 'code' dari searchParams
    setFormData((prev) => ({ ...prev, code: referral }));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    await register(formData);
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold">Register</h2>
      {message && (
        <div
          className={`text-center mt-4 p-2 rounded ${
            message.includes("berhasil")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10">
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={formData.name}
          onChange={handleChange}
        />
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
    </div>
  );
};

export default SignUp;
