import { ProfileCart } from "./profileCart";
import { ProfileEvents } from "./profileEvents";
import { ProfileHeader } from "./profileHeader";
import '@/css/profilePage/profilePage.css';
import { ProfilePromotions } from "./profilePromotions";
import { ModalAddEvent } from "../modal/modalAddEvent";
import { ProfileTitle } from "./profileTitle";

export function ProfilePage(){
    return (
        <div className="profile-page">
            <ProfileTitle/>
            <ProfileHeader/>
            <ProfileCart/>
            <ProfileEvents/>
            <ProfilePromotions/>
        </div>
    )
}