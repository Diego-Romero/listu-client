import { UserResponse } from "./api/requests";

export type AuthenticatedContextType = {
  user: null | UserResponse;
  logout: () => void;
  login: (user: UserResponse) => void;
};

export type LoadingContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export interface List {
  name: string;
  _id: string;
  users: User[];
  description?: string;
  createdAt: Date;
  createdBy: User;
}
export interface ListItem {
  _id: string;
  name: string;
  createdAt: Date;
  createdBy: User;
  description?: string;
  done: boolean;
  dateCompleted?: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  lists: List[];
}
