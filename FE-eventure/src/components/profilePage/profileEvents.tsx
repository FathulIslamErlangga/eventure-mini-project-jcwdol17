'use client';
import "@/css/profilePage/profileEvents.css";
import { EventCard3 } from "../eventCard3";
import { ModalAddEvent } from "../modal/modalAddEvent";
import { useState } from "react";


export function ProfileEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNewEvent = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && <ModalAddEvent onClose={handleCloseModal} />}
      <div className="profile-events">
        <div className="profile-events-title">
          <div className="profile-events-title-text">
            <span>Events</span>
          </div>
          <div className="profile-events-title-btn">
            <button className="e-btn bg-primary text-neutral" onClick={handleAddNewEvent}>Add New +</button>
          </div>
        </div>
        <div className="profile-events-content">
          <EventCard3 onEdit={() => setIsModalOpen(true)}/>
          <EventCard3 onEdit={() => setIsModalOpen(true)}/>
          <EventCard3 onEdit={() => setIsModalOpen(true)}/>
          <EventCard3 onEdit={() => setIsModalOpen(true)}/>
          <EventCard3 onEdit={() => setIsModalOpen(true)}/>
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
