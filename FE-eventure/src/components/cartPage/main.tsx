"use client";
import Image from "next/image";
import "@/css/cartPage/cart.css";
import { CartCard } from "./cartCard";
import { useAuth } from "@/components/contexts/AuthContexts";
import { useCart } from "@/hooks/cart.hooks";
import { useEffect } from "react";

export function Cart() {
  const { auth } = useAuth();
  const userSlug = auth.user?.data.slug;
  const { cartData, handleFetchCartItems, isLoading, error } = useCart();

  useEffect(() => {
    if (userSlug) {
      handleFetchCartItems(userSlug);
    }
  }, [userSlug]);

  if (isLoading) return <div>Loading cart items...</div>;
  if (error) return <div>Error loading cart: {error}</div>;

  return (
    <div className="cart-page">
      <div className="cart-page-title">
        <div className="cart-page-title-text">
          <span>Cart</span>
        </div>
        <div className="cart-page-title-pic">
          <Image
            src="/assets/images/icons/Star Neo.svg"
            alt="Neo Star"
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className="cart-page-content">
        {cartData?.data?.length > 0 ? (
          cartData.data.map((cartItem: any, index: number) => (
            <CartCard key={index} cartItem={cartItem} />
          ))
        ) : (
          <div>No cart items found</div>
        )}
      </div>
      {cartData?.meta && (
        <div className="w-full h-fit flex items-center justify-center">
          <div className="join">
            {[...Array(cartData.meta.totalPages)].map((_, i) => (
              <button
                key={i}
                className={`join-item btn ${
                  i + 1 === cartData.meta.currentPage ? "btn-active" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
