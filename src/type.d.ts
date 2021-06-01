export interface List {
  name: string;
  _id: string;
  users: User[];
  description?: string;
  createdAt: Date;
  createdBy: User;
  items: (ListItem | TentativeListItem)[]
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

export type listOrderType = { [key: string]: number };

export interface TentativeListItem {
  _id: string;
  name: string;
  done: boolean;
}

export type ListItemType = ListSingleItem | TentativeListItem;