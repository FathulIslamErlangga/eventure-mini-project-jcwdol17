import { IProfiles, IUsers } from "./interfaces";

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
