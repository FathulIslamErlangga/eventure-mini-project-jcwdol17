import { ProfileCart } from "./profileCart";
import { ProfileEvents } from "./profileEvents";
import { ProfileHeader } from "./profileHeader";
import '@/css/profilePage/profilePage.css';
import { ProfilePromotions } from "./profilePromotions";

export function ProfilePage(){
    return (
        <div className="profile-page">
            <ProfileHeader/>
            <ProfileCart/>
            <ProfileEvents/>
            <ProfilePromotions/>
        </div>
    )
}