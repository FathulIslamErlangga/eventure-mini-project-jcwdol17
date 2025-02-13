"use client";
import { useAuth } from "@/components/contexts/AuthContexts";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/css/authPage/verifyEmail.css";

const page = () => {
  const { auth } = useAuth();
  const { verificationEmail } = auth;
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
      setStatus("User is not found, please register first");
    }
  }, [token]);

  return (
    <div className="verify-email-page">
      <div className="verify-email-container">
        <div className="verify-email-pic">
          <Image
            src="/assets/images/icons/circle-info-solid.svg"
            alt="info"
            width={80}
            height={80}
          />
        </div>
        <div className="verify-email-info">
          <div className="verify-email-info-title">
            <h1>Info</h1>
          </div>
          <div className="verify-email-info-text">
            <span>{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
