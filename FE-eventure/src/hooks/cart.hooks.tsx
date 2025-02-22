import { useState } from "react";
import {
  createCart,
  getCartItem,
  deleteCartItem,
  updateAttendee,
  fetchCartItems,
} from "@/services/cart.service";

export const useCart = () => {
  const [cartData, setCartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new cart
  const handleCreateCart = async (cartDetails?: any) => {
    try {
      setIsLoading(true);
      const newCart = await createCart(cartDetails);
      setCartData(newCart);
      setError(null);
      return newCart;
    } catch (err: any) {
      setError(err.message || "Failed to create cart");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get cart item by slug
  const handleGetCartItem = async (slug: string) => {
    try {
      setIsLoading(true);
      const cartItem = await getCartItem(slug);
      setCartData(cartItem);
      setError(null);
      return cartItem;
    } catch (err: any) {
      setError(err.message || "Failed to get cart item");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete cart item
  const handleDeleteCartItem = async (attendeeId: string) => {
    try {
      setIsLoading(true);
      await deleteCartItem(attendeeId);
      setCartData(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to delete cart item");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch cart items for a user
  const handleFetchCartItems = async (userSlug: string) => {
    try {
      setIsLoading(true);
      const cartItems = await fetchCartItems(userSlug);
      setCartData(cartItems);
      setError(null);
      return cartItems;
    } catch (err: any) {
      setError(err.message || "Failed to fetch cart items");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update attendee in cart
  const handleUpdateAttendee = async (attendeeData: any) => {
    try {
      setIsLoading(true);
      const updatedCart = await updateAttendee(attendeeData);
      setCartData(updatedCart);
      setError(null);
      return updatedCart;
    } catch (err: any) {
      setError(err.message || "Failed to update attendee");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cartData,
    isLoading,
    error,
    handleCreateCart,
    handleGetCartItem,
    handleDeleteCartItem,
    handleFetchCartItems,
    handleUpdateAttendee,
  };
};

export default useCart;
