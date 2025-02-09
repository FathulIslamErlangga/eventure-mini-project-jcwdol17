import Image from "next/image";
import "@/css/cartPage/cartCard.css";

export function CartCard(){
    return (
        <div className="cart-card">
        <div className="cart-card-pic">
          <Image
            src="/assets/images/contents/events/Sample 1.jpg"
            alt="sample-1"
            width={200}
            height={200}
          />
        </div>
        <div className="cart-card-info">
          <div className="cart-card-info-det">
            <div className="cart-card-info-det-title">
              <span>Blackpink Comeback</span>
            </div>
            <div className="card-info-det-content">
              <div className="w-full h-fit flex gap-3">
                <div className="card-info-det-price">
                  <span>Rp. 1.000.000</span>
                </div>
                <div className="card-info-det-ctg">
                  <span>Concert & Music</span>
                </div>
              </div>
              <div className="card-info-det-count">
                <div className="card-info-det-count-min">
                  <Image
                    src="/assets/images/icons/minus.svg"
                    alt="minus"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="card-info-det-count-num">
                  <span>0</span>
                </div>
                <div className="card-info-det-count-add">
                  <Image
                    src="/assets/images/icons/plus.svg"
                    alt="plus"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cart-card-action">
          <div className="cart-card-action-tleft">
            <span>
              <span className="text-[20px]">15</span>
              <br />
              Ticket Left
            </span>
          </div>
          <div className="cart-card-action-btn">
            <div className="cart-card-action-btn-remove">
              <Image
                src="/assets/images/icons/delete.svg"
                alt="remove"
                width={30}
                height={30}
              />
            </div>
            <div className="cart-card-action-btn-co">
              <Image
                src="/assets/images/icons/dollar.svg"
                alt="co"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>
    )
}