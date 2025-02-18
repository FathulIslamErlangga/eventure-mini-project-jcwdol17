import { AttandanceData } from "@/components/admin/attandance/attandanceData";
import '@/css/adminPage/attandancePage/attandancePage.css'
export default function AdminAttandance(){
    return(
        <div className="admin-attandance">
            <div className="admin-attandance-title">
                <span>Event Attandance</span>
            </div>
            <div className="admin-attandance-content">
                <AttandanceData/>
            </div>
        </div>
    )
}