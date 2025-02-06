import Image from "next/image";
import '@/css/eoPage/eoPage.css';
import '@/css/homePage/categoriesStyle.css';    
import { EoCard } from "./eoCard";


export function EOPage() {
  return (
    <div className="eo-page">
      <div className="eo-page-title">
        <div className="eo-page-title-text">EO</div>
        <div className="eo-page-title-pic">
            <Image
              src="/assets/images/contents/eo/Star 11.svg"
              alt="star-11"
              width={150}
              height={150}
            />
        </div>
      </div>
      <div className="eo-page-content">
        <div className="eo-page-content-1">
          <EoCard/>
          <EoCard/>
          <EoCard/>
          <EoCard/>
          <EoCard/>
          <EoCard/>
        </div>
        <div className="eo-page-pagination">
          <div className="join">
            <button className="join-item btn">1</button>
            <button className="join-item btn btn-active">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
          </div>
        </div>
      </div>
    </div>
  );
}
