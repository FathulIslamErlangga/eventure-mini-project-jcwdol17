import Image from "next/image";
import { CartCard } from "../cartPage/cartCard";
import "@/css/profilePage/profileCart.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoadingNavigation } from "@/hooks/loadingNav.hook";
import { useAuth } from "@/components/contexts/AuthContexts";
import { useCart } from "@/hooks/cart.hooks";
import { useEffect } from "react";
import { Skeleton } from "../skeleton";
import { NoData } from "../noData";

export function ProfileCart() {
  const { auth } = useAuth();
  const userSlug = auth.user?.data.slug;
  const { cartData, handleFetchCartItems, isLoading, error } = useCart();

  const { navigateWithLoading, LoadingWrapper } = useLoadingNavigation();
  const router = useRouter();
  const handleClick = (path: string) => {
    navigateWithLoading(path);
  };

  useEffect(() => {
    if (userSlug) {
      handleFetchCartItems(userSlug);
    }
  }, [userSlug]);

  if (isLoading) return <div><Skeleton/></div>;
  if (error) return <><NoData messages="No Cart Data"/></>;

  return (
    <>
      <LoadingWrapper />
      <div className="profile-cart">
        <div className="profile-cart-title">
          <div className="profile-cart-title-text">
            <span>Cart</span>
          </div>
          <div className="profile-cart-title-btn">
            <button
              className="e-btn bg-primary text-neutral"
              onClick={() => handleClick("/cart")}
            >
              See More
            </button>
          </div>
        </div>
        <div className="profile-cart-content">
          {cartData?.data?.length > 0 ? (
            cartData.data
              .slice(0, 2)
              .map((cartItem: any, index: number) => (
                <CartCard key={index} cartItem={cartItem} />
              ))
          ) : (
            <div><NoData messages={"No Cart Data"}/></div>
          )}
        </div>
      </div>
    </>
  );
}
