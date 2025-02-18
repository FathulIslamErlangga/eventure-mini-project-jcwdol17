import { AttandanceDetData } from "@/components/admin/attandance/details/attandanceDetData";
import '@/css/adminPage/attandancePage/details/attandanceDetData.css';

export default function AdminAttandanceDetails(){
    return(
        <div className="admin-attandance-details">
            <div className="admin-attandance-details-title">
                <span>Attandance Details</span>
            </div>
            <div className="admin-attandance-details-content">
                <AttandanceDetData/>
            </div>
        </div>
    )
}