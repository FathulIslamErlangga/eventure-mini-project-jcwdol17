import {
  ICategory,
  IEvents,
  IGallery,
  IProfiles,
  IUsers,
  IAddress,
  ITransactions,
  IAtendees,
} from "./interfaces";

export interface IChangePassword {
  newPassword: string;
  confirmPassword: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  code?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  status?: string;
  message: string;
  data: IUsers;
  token?: string;
}

export interface Galleries {
  imageUrl: string;
  imageType: string;
}
export interface IUpdatedProfile {
  name: string;
  address: string;
  city: string;
  phone: string;
  imageProfile: string;
  slug?: string;
}

export interface IProfileResponse {
  message: string;
  data: IProfiles;
}

export interface IUpdatedPassword {
  newPassword: string;
  oldPassword: string;
}

// Get Event Interface
export interface Meta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
export interface getEvent {
  message: string;
  data: IEvents[];
  meta: Meta;
}

export interface createEvents {
  name: string;
  description: string;
  price: string;
  availableSeats: string;
  cover: string;
  thumbnail: string;
  address: string;
  city: string;
  categoryId: string;
}

export interface eventsResponse {
  message: string;
  data: IEvents;
  meta?: Meta;
}
export interface categoriesResponse {
  message: string;
  data: ICategory[];
}
export interface Meta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
export interface getEvent {
  message: string;
  data: IEvents[];
  meta: Meta;
}
export interface addressResponse {
  message: string;
  data: IAddress[];
}
export interface categoryResponse {
  message: string;
  data: ICategory[];
}

export interface transactionResponse {
  message: string;
  data: ITransactions[];
}

export interface analyticsResponse {
  totalProfit: number;
  message: string;
}

export interface attendeeResponse {
  message: string;
  data: IAtendees[];
}

export interface ICartData {
  eventId: string;
  ticketCount: number;
  eventName: string;
  price: number;
  totalPrice: number;
}

export interface ICartItemsParams {
  page?: number;
  limit?: number;
  userSlug?: string;
}

export interface ICartItem {
  id: string;
  event: IEvents;
  quantity: number;
}

export interface ICartResponse {
  message: string;
  data: ICartItem[];
  meta?: Meta;
}

export interface AnalyticsResponse {
  totalProfit: number;
}

export interface ProfitTrackFilter {
  range?: "daily" | "weekly" | "monthly" | "yearly" | "custom";
  startDate?: string;
  endDate?: string;
}
