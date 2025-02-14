"use client";
import Image from "next/image";
import "@/css/modal.css";


interface ModalAddPromotionsProps {
  onClose: () => void;
}

export function ModalAddPromotions({ onClose }: ModalAddPromotionsProps) {
  return (
    <div className="emodal3">
      <div className="emodal2-content">
        <div className="emodal-close">
          <div className="emodal-btn-close" onClick={onClose}>
            <Image
              src="/assets/images/icons/close.svg"
              alt="close"
              width={15}
              height={15}
            />
          </div>
        </div>
        <div className="emodal-title">
          <span>Promotions</span>
        </div>
        <form className="eventure-form" action="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Code
              <input type="text" className="grow" placeholder="Music Concert" />
            </label>
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Start Date
              <input type="date" className="grow" placeholder="DD/MM/YYYY" />
            </label>
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              End Date
              <input type="date" className="grow" placeholder="DD/MM/YYYY" />
            </label>
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Discount
              <input type="number" className="grow" placeholder="1000000" />
            </label>
            <label className="border-[2.5px] border-[#04002D] input input-bordered flex items-center gap-2">
              Usage Limit
              <input type="number" className="grow" placeholder="100" />
            </label>
          </div>
          <button className="eventure-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
