"use client";

import "@/css/profilePage/profileTitle.css";
import { Span } from "next/dist/trace";
import { useState } from "react";
import { ModalPointLog } from "../modal/modalPointLog";

export function ProfileTitle() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePointLogs = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && <ModalPointLog onClose={handleCloseModal} />}
      <div className="profile-page-title">
        <div className="profile-page-title-text">
          <span>Profile</span>
        </div>
        <div className="profile-page-title-btn">
          <button className="e-btn2 bg-success text-[#04002D] text-[22px]"
          onClick={handlePointLogs}>
            100 Points
          </button>
          <span className="point-exp">Exp : 23/01/2025</span>
        </div>
      </div>
    </>
  );
}
