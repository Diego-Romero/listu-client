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
  attachmentUrl: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  lists: List[];
}
