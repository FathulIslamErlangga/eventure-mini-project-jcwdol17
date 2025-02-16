import {
  categoriesResponse,
  createEvents,
  eventsResponse,
  IChangePassword,
  IProfileResponse,
  IUpdatedPassword,
  LoginData,
  RegisterData,
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
  message: string | undefined;
  eventsCreated: (create: FormData) => Promise<void>;
}
export interface categoriesProps {
  category: categoriesResponse | undefined;
  message: string | undefined;
}
export interface AllProps {
  auth: AuthProps;
  profilesUser: profilesProps;
  events: eventsProps;
  categories: categoriesProps;
}
