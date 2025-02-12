import Image from "next/image";
import '@/css/profilePage/promotionCard.css';

interface PromotionCardProps {
  onEdit?: () => void;
}

export function PromotionCard({onEdit} : PromotionCardProps) {
  return (
    <div className="promotion-card">
      <div className="promotion-card-pic">
        <Image
          src="/assets/images/contents/events/Star 12.svg"
          alt="star"
          width={100}
          height={100}
        />
      </div>
      <div className="promotion-card-info">
        <div className="promotion-card-info-title">
          <span>REF12345</span>
        </div>
        <div className="promotion-card-info-date">
          <Image src='/assets/images/icons/start-date.svg' alt='date' width={20} height={50}/>
          <span>23/01/2025 - 23/02/2025</span>
        </div>
      </div>
      <div className="promotion-card-action">
        <button className="e-btn bg-warning" onClick={(e) => {
                    e.preventDefault(); 
                    onEdit && onEdit();
                  }}>
          <Image
            src="/assets/images/icons/edit.svg"
            alt="edit"
            width={30}
            height={30}
          />
        </button>
        <button className="e-btn bg-error">
          <Image
            src="/assets/images/icons/delete.svg"
            alt="delete"
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  );
}
