'use client';
import Link from "next/link";
import "@/css/profilePage/profilePromotions.css";
import { PromotionCard } from "./promotionCard";
import { useState } from "react";
import { ModalAddPromotions } from "../modal/modalAddPromotions";

export function ProfilePromotions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNewPromotions = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    {isModalOpen && <ModalAddPromotions onClose={handleCloseModal} />}
      <div className="profile-promotions">
        <div className="profile-promotions-title">
          <div className="profile-promotions-title-text">
            <span>Promotions</span>
          </div>
          <div className="profile-promotions-title-btn">
           
              <button className="e-btn bg-primary text-neutral" onClick={handleAddNewPromotions}>
                + Add New
              </button>
            
          </div>
        </div>
        <div className="profile-promotions-content">
          <PromotionCard onEdit={() => setIsModalOpen(true)}/>
          <PromotionCard onEdit={() => setIsModalOpen(true)}/>
          <PromotionCard onEdit={() => setIsModalOpen(true)}/>
        </div>
        <div className="w-full h-fit flex justify-center items-center">
          <div className="join">
            <button className="join-item btn">1</button>
            <button className="join-item btn btn-active">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
          </div>
        </div>
      </div>
    </>
  );
}
