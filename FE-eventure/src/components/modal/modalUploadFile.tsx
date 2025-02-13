"use client";
import Image from "next/image";
import "@/css/modal.css";
import { useState } from "react";

interface ModalUploadFileProps {
  onClose: () => void;
}

export function ModalUploadFile({ onClose }: ModalUploadFileProps) {
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
          <span>Upload Proof of Payment</span>
        </div>
        <form className="eventure-form" action="">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Pick a Proof of Payment</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full border-[2.5px] border-[#04002D]"
            />
          </label>

          <button className="eventure-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
