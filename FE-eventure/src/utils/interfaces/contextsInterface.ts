import {
  addressResponse,
  attendeeResponse,
  categoriesResponse,
  createEvents,
  eventsResponse,
  getEvent,
  IChangePassword,
  IProfileResponse,
  IUpdatedPassword,
  LoginData,
  notificationResponse,
  RegisterData,
  transactionResponse,
  UserResponse,
} from "./customInsterface";

export interface AuthProps {
  user: UserResponse | undefined;
  message: string | undefined;
  loading: boolean;
  isAuth: boolean;
  isOpen: boolean;
  onClickModal: () => void;
  register: (data: RegisterData) => Promise<void>;
  verificationEmail: (token: string) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  forgot: (email: string) => Promise<void>;
  changePassword: (data: IChangePassword) => Promise<void>;
}

export interface profilesProps {
  profiles: IProfileResponse | undefined;
  message: string | undefined;
  profile: (data: FormData, slug: string) => Promise<void>;
  changePassword: (data: IUpdatedPassword, slug: string) => Promise<void>;
}

export interface eventsProps {
  event: eventsResponse | undefined;
  getevent: getEvent | undefined;
  message: string | undefined;
  loading: boolean;
  error: string | null;
  setMessage?: (message: string | undefined) => void;
  eventsCreated: (create: FormData) => Promise<void>;
  getEventData: (page?: number) => Promise<void>;
  getEventBySlug: (slug: string) => Promise<eventsResponse>;
  updateEvent: (slug: string, update: FormData) => Promise<void>;
  deleteEvent: (slug: string) => Promise<void>;
}

export interface categoriesProps {
  category: categoriesResponse | undefined;
  message: string | undefined;
}

export interface addressProps {
  address: addressResponse | undefined;
  message: string | undefined;
}

export interface transactionProps {
  transaction: transactionResponse | undefined; 
  loading: boolean; 
  error: any; 
  createTransactions: (data: any) => Promise<transactionResponse>; 
  getAllTransaction: () => Promise<transactionResponse[]>; 
  getTransaction: (id: string) => Promise<transactionResponse>; 
  updateTransaction: (id: string, data: any) => Promise<void>; 
  uploadProof: (data: FormData) => Promise<void>; 
}

export interface notificationProps {
  notification: notificationResponse | undefined;
  message: string | undefined;
}

export interface attendeeProps{
  attendee: attendeeResponse | undefined;
  message: string | undefined;
}

export interface AllProps {
  auth: AuthProps;
  profilesUser: profilesProps;
  events: eventsProps;
  categories: categoriesProps;
  notifications: notificationProps;
}
