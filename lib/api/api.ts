import axios from "axios";

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
}

export interface User {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createAt: Date;
  updateAt: Date;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};
