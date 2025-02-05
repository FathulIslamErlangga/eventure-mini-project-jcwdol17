import { IUsers } from "./interfaces";

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
