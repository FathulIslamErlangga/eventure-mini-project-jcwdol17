"use client";
import "@/css/eoPage/eoDetailsPage/eoDetPage.css";
import React, { useEffect } from "react";
import { EoDetHeader } from "./eoDetHeader";
import { EoDetContent } from "./eoDetContent";
import { EoDetEvents } from "./eoDetEvents";
import { Review } from "@/components/review";
import { useCart } from "@/hooks/cart.hooks";
import { useAuth } from "@/components/contexts/AuthContexts";

export function EoDetailsPage() {
  const { auth } = useAuth();
  const { cartData, handleFetchCartItems, isLoading, error } = useCart();
  const userSlug = auth.user?.data.slug;

  useEffect(() => {
    const fetchCart = async () => {
      if (userSlug) {
        try {
          const res = await handleFetchCartItems(userSlug);
          console.log("Cart Data:", res);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };
    fetchCart();
  }, [userSlug]);

  return (
    <div className="eo-details-page">
      <EoDetHeader />
      <EoDetEvents />
      <Review />
    </div>
  );
}
