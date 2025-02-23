import api from "@/utils/api/axios";
import {
  attendeeResponse,
  attendeeResponseBySlug,
  attendeeResponseCheckin,
  ICartData,
  ICartItemsParams,
  ICartResponse,
} from "@/utils/interfaces/customInsterface";

// Create a new cart
export const createCart = async (cartData: ICartData) => {
  try {
    const response = await api.post("/carts/v1", cartData);
    return {
      message: "Cart created successfully",
      data: response.data,
    };
  } catch (error) {
    throw {
      message: "Failed to create cart",
      data: null,
    };
  }
};

// Get cart item by slug
export const getCartItem = async (slug: string) => {
  try {
    const response = await api.get(`/carts/v2/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete cart item by attendee ID
export const deleteCartItem = async (attendeeId: string) => {
  try {
    const response = await api.delete(`/carts/v3/${attendeeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update attendee in cart
export const updateAttendee = async (attendeeData: any) => {
  try {
    const response = await api.patch("/carts/v4/", attendeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch cart items for a specific user
export const fetchCartItems = async (userSlug: string) => {
  try {
    const response = await api.get(`/carts/v2/${userSlug}`);
    return response.data;
  } catch (error) {
    // Return a default response structure
    return {
      message: "Failed to fetch cart items",
      data: [],
      meta: {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
        perPage: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
};

export const GetAttendee = async () => {
  try {
    const response = await api.get<attendeeResponse>("/carts/v5");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Existing Attendee method
export const Attendee = async () => {
  try {
    const response = await api.get<attendeeResponse>("/carts/v1");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAttendeeEvent = async () => {
  try {
    const response = await api.get<attendeeResponse>("/carts/v5");

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAttendeeSlug = async (slug: string) => {
  try {
    const response = await api.get<attendeeResponseBySlug>(`/carts/v6/${slug}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkinAttendee = async (checkedIn: boolean, slug: string) => {
  try {
    console.log("Sending check-in request:", checkedIn);
    const response = await api.patch<attendeeResponseCheckin>(
      `/carts/v4/${slug}`,
      {
        checkedIn,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
