"use client";
import { ProfileCart } from "./profileCart";
import { ProfileEvents } from "./profileEvents";
import { ProfileHeader } from "./profileHeader";
import "@/css/profilePage/profilePage.css";
import { ProfilePromotions } from "./profilePromotions";
import { ModalAddEvent } from "../modal/modalAddEvent";
import { ProfileTitle } from "./profileTitle";
import { useAuth } from "../contexts/AuthContexts";

export function ProfilePage() {
  const { auth } = useAuth();
  return (
    <div className="profile-page">
      <ProfileTitle />
      <ProfileHeader />
      <ProfileCart />
      {auth.user?.data.role === "ORGANIZER" && (
        <>
          <ProfileEvents />
          <ProfilePromotions />
        </>
      )}
    </div>
  );
}
