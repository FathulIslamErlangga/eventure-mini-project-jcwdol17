"use client";

import "@/css/profilePage/profileTitle.css";
import { useState } from "react";
import { ModalPointLog } from "../modal/modalPointLog";
import { useAuth } from "../contexts/AuthContexts";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { ModalVoucher } from "../modal/modalVoucher";
export function ProfileTitle() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVoucher, setIsModalVoucher] = useState(false);
  const [copied, setCopied] = useState(false);
  const { auth } = useAuth();
  const referralCopy = `http://localhost:3000/signup?code=${auth.user?.data.code}`;
  const referralCode = auth.user?.data.code;
  const handlePointLogs = () => {
    setIsModalOpen(true);
  };
  const handleVoucher = () => {
    setIsModalVoucher(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
      toast.success("Referral code copied!");
    } catch (err) {
      toast.error("Failed to copy referral code");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalVoucher(false);
  };
  return (
    <>
      {isModalOpen && <ModalPointLog onClose={handleCloseModal} />}
      {isModalVoucher && <ModalVoucher onClose={handleCloseModal} />}
      <div className="profile-page-title">
        <div className="profile-page-title-text">
          <span>Profile</span>
        </div>
        <div>
          <h1 className="text-2xl text-center">Referral</h1>
          <div className="w-fit h-fit flex items-center gap-2  p-3">
            <span className="text-lg pr-3 text-[#04002D]">{referralCode}</span>
            <button
              onClick={handleCopy}
              className=" bg-gray-200 rounded-sm p-2"
            >
              {copied ? (
                <ClipboardCheck className="text-green-500 w-50" />
              ) : (
                <Clipboard />
              )}
            </button>
          </div>
        </div>
        <div className="profile-page-title-btn">
          <button
            className="e-btn2 bg-success text-[#04002D] text-[22px]"
            onClick={handlePointLogs}
          >
            {auth.user?.data.wallet?.points} Points
          </button>
          <button
            className="e-btn2 bg-success text-[#04002D] text-[22px]"
            onClick={handleVoucher}
          >
            Voucher
          </button>
        </div>
      </div>
    </>
  );
}
