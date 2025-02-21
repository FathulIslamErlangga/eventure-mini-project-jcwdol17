"use client";
import Image from "next/image";
import "@/css/cartPage/cartCard.css";
import { IEvents } from "@/utils/interfaces/interfaces";
import { useCart } from "@/hooks/cart.hooks";
import { toast } from "react-toastify";
import { useState } from "react";

interface CartCardProps {
  cartItem: {
    id: string;
    event: IEvents;
    quantity: number;
    // Add other properties as needed
  };
}

export function CartCard({ cartItem }: CartCardProps) {
  const { handleDeleteCartItem,isLoading } = useCart();
  const [localTicketCount, setLocalTicketCount] = useState(cartItem.quantity);

  console.log('ini qty nya : '+cartItem.quantity);
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const increment = () => {
    setLocalTicketCount(localTicketCount + 1);
  };

  const decrement = () => {
    setLocalTicketCount(localTicketCount > 0 ? localTicketCount - 1 : 0);
  };
  const handleDeleteCart = async () => {
    try {
      await handleDeleteCartItem(cartItem.id);
      toast.success(`Removed ${cartItem.event.name} from cart`);
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error(error);
    }
  };

  return (
    <div className="cart-card">
      <div className="cart-card-pic">
        <Image
          src={cartItem.event.gallery?.[0].imageUrl}
          alt="sample-1"
          width={200}
          height={200}
        />
      </div>
      <div className="cart-card-info">
        <div className="cart-card-info-det">
          <div className="cart-card-info-det-title">
            <span>{cartItem.event.name}</span>
          </div>
          <div className="card-info-det-content">
            <div className="w-full h-fit flex gap-3">
              <div className="card-info-det-price">
                <span>{formatRupiah(cartItem.event.price)}</span>
              </div>
              {/* <div className="card-info-det-ctg">
                <span>{cartItem.event.category?.name}</span>
              </div> */}
            </div>
            {/* <div className="card-info-det-count">
              <div className="card-info-det-count-min" onClick={decrement}>
                <Image
                  src="/assets/images/icons/minus.svg"
                  alt="minus"
                  width={20}
                  height={20}
                />
              </div>
              <div className="card-info-det-count-num">
                <span>{localTicketCount}</span>
              </div>
              <div className="card-info-det-count-add" onClick={increment}>
                <Image
                  src="/assets/images/icons/plus.svg"
                  alt="plus"
                  width={20}
                  height={20}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="cart-card-action">
        <div className="cart-card-action-tleft">
          <span>
            <span className="text-[15px]">{cartItem.event.availableSeats}</span>
            <br />
            Ticket Left
          </span>
        </div>
        <div className="cart-card-action-btn">
          <div className="cart-card-action-btn-remove" onClick={handleDeleteCart}>
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
  );
}
