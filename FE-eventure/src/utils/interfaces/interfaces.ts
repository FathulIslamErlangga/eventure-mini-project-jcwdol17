export interface IUsers {
  id: string;
  email: string;
  password?: string;
  role: Role;
  code: string;
  slug: string;
  isEmailVerified: boolean;
  profile?: IProfiles;
  wallet?: IWallet;
  vouchers?: IVoucher[];
  reviews?: IReviews[];
  events?: IEvents[];
  refferals?: IReferrals[];
  logReferrals?: ILogReferrals[];
  transactions?: ITransactions[];
  notifications?: INotifications[];
  attendee?: IAtendees[];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Role {
  Organizer = "ORGANIZER",
  Customer = "CUSTOMER",
}

export interface IProfiles {
  id: string;
  name: string;
  phone?: string;
  userId: IUsers;
  address?: IAddress;
  imageProfile: IGallery[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IAddress {
  id: string;
  address?: string;
  city?: string;
  profileId: IProfiles;
  events?: IEvents[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IGallery {
  id: string;
  imageUrl: string;
  imageType: string;
  eventId?: IEvents;
  profileId?: IProfiles;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWallet {
  id: string;
  balance: string;
  points: string;
  pointLogs: IPointLogs[];
  userId: IUsers;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPointLogs {
  id: string;
  amount: number;
  description: string;
  type: PointLogType;
  walletId: IWallet;
  expirationDate: Date;
  createdAt: Date;
}
enum PointLogType {
  Earned = "EARNED",
  Spent = "SPENT",
  Expired = "EXPIRED",
}
export interface IVoucher {
  id: string;
  code: string;
  discount: number;
  usageLimit: number;
  global: boolean;
  startDate: Date;
  endDate: Date;
  userId?: IUsers;
  eventId?: IEvents;
  createdAt: Date;
  updatedAt: Date;
}
export interface IReviews {
  id: string;
  comment: string;
  rating: number;
  customerId: IUsers;
  event: IEvents;
  createdAt: Date;
  updatedAt: Date;
}
export interface IEvents {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  availableSeats: number;
  categoryId: ICategory;
  addressId: IAddress;
  address?: IAddress;
  organizerId: IUsers;
  organizer?: IUsers;
  category?: ICategory;
  gallery: IGallery[];
  transactions: ITransactions[];
  reviews: IReviews[];
  vouchers: IVoucher[];
  attendees: IAtendees[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  events: IEvents[];
}

export interface IReferrals {
  id: string;
  referrerId: IUsers;
  logs: ILogReferrals[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ILogReferrals {
  id: string;
  rewardGiven: boolean;
  referralsId: IReferrals;
  referredId: IUsers;
  createdAt: Date;
}
export interface ITransactions {
  id: string;
  ticketQuantity: number;
  totalPrice: number;
  paymentProof: string;
  customerId: IUsers;
  eventId: IEvents;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  statusLogs: IStatusLogs[];
  attendee: IAtendees;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
enum PaymentMethod {
  BANK_TRANSFER = "BANK_TRANSFER",
  E_WALLET = "E_WALLET",
  CREDIT_CARD = "CREDIT_CARD",
}

enum TransactionStatus {
  WAITING_PAYMENT = "WAITING_PAYMENT",
  WAITING_CONFIRMATION = "WAITING_CONFIRMATION",
  DONE = "DONE",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELED = "CANCELED",
}

export interface IStatusLogs {
  id: string;
  transactionId: ITransactions;
  status: TransactionStatus;
  changedAt: Date;
}
export interface INotifications {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  userId: IUsers;
  createdAt: Date;
}
export interface IAtendees {
  id: string;
  tiketCount: number;
  checkedIn: boolean;
  transactionId: ITransactions;
  eventId: IEvents;
  userId: IUsers;
  createdAt: Date;
  updatedAt: Date;
}
