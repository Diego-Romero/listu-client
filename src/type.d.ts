import { UserResponse } from "./api/requests";

export type AuthenticatedContextType = {
  user: null | UserResponse;
  logout: () => void;
  login: (user: UserResponse) => void;
};

export interface List {
  name: string;
  _id: string;
  users: User[];
  description?: string;
  createdAt: string;
  createdBy: User;
}
export interface ListItem {
  _id: string;
  name: string;
  createdAt: string;
  createdBy: User;
  description: string;
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
