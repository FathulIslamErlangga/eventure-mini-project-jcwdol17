import "@/css/eoPage/eoDetailsPage/eoDetPage.css";
import { EoDetHeader } from "./eoDetHeader";
import { EoDetContent } from "./eoDetContent";
import { EoDetEvents } from "./eoDetEvents";
import { Review } from "@/components/review";

export function EoDetailsPage() {
  return (
    <div className="eo-details-page">
      <EoDetHeader />
      <EoDetEvents/>
      <Review/>
    </div>
  );
}
