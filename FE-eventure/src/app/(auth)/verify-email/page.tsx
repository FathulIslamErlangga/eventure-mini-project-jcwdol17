"use client";
import { useAuth } from "@/components/contexts/AuthContexts";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { verificationEmail } = useAuth();
  const [status, setStatus] = useState("");
  const useQueryToken = useSearchParams();
  const router = useRouter();
  const token = useQueryToken.get("token");

  useEffect(() => {
    if (token) {
      try {
        verificationEmail(token);
        setStatus("Email verified successfully! Redirecting...");
        setTimeout(() => router.push("/signin"), 3000);
      } catch (error) {
        setStatus("Email verify failed");
      }
    } else {
      setStatus("user is not found, please register first");
    }
  }, [token]);

  return <h1 className="text-center pt-40">{status}</h1>;
};

export default page;
