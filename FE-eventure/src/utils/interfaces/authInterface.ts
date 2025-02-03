import { IUsers } from "./interfaces";

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
  message: string;
  data: IUsers;
  token: string;
}
