export type AuthenticatedContextType = {
  loggedIn: boolean;
  logout: () => void;
  login: () => void;
};

export interface Friend {
  id: string;
  name: string;
  email: string;
}

export interface List {
  name: string;
  listId: string;
  userId: string;
  description?: string;
  createdAt: string;
}
export interface ListItem {
  itemId: string;
  name: string;
  createdAt: string;
  createdBy: User;
  description: string;
  done: boolean;
  dateCompleted?: string;
  attachment?: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
}
