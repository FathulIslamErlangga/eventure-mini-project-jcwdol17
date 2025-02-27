"use client";
import Image from "next/image";
import "@/css/modal.css";
import { useState } from "react";
import { PointLogCard } from "../profilePage/pointLogCard";

interface ModalPointLogProps {
  onClose: () => void;
}

export function ModalPointLog({ onClose }: ModalPointLogProps) {
  return (
    <div className="emodal2">
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
          <span>Point Logs</span>
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <div className="w-full h-fit flex flex-col gap-2">
            <PointLogCard />
          </div>
        </div>
      </div>
    </div>
  );
}
