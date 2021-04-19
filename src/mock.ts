import { List, ListItem } from "./type";

const genericDate = "12 March, 2021";

export const mockLists: List[] = [
  {
    name: "house list",
    listId: "1",
    userId: "1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    createdAt: genericDate,
  },
  {
    name: "chores list",
    userId: "1",
    listId: "2",
    description: "",
    createdAt: genericDate,
  },
  {
    name: "work todos",
    userId: "1",
    listId: "3",
    description: "",
    createdAt: genericDate,
  },
];

export const mockList: List = {
  name: "house list",
  listId: "1",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  createdAt: genericDate,
  userId: "1",
};

export const listItems: ListItem[] = [
  {
    done: false,
    name: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    itemId: "1",
    createdAt: "12 March, 2021", // don't know the date format yet
    createdBy: {
      id: "1",
      name: "Diego",
      email: "user@mail.com",
    },
  },
];
