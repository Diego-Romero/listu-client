import * as Yup from "yup";

export const REQUIRED_FIELD_ERROR = "Required";
export const REQUIRED_FIELD_TOO_SHORT_TEXT = "Too Short!";
export const REQUIRED_FIELD_TOO_LONG_TEXT = "Too Long!";

export const NAME_MIN_LENGTH = 2;
export const PASSWORD_MIN_LENGTH = 6;

export const SPACING_INPUTS = 4;
export const SPACING_BUTTONS = 8;

export const config = {
  localStorage: { 
    token: 'token',
    listsOrder: 'listsOrder',
    activeList: 'activeList'
  },
  env: {
    serverUrl: process.env.REACT_APP_SERVER_URL,
    gaId: process.env.REACT_APP_GA_ID,
  },
  routes: {
    login: "/login",
    newFriend: "/new-friend/:id",
    forgotPassword: "/forgot-password",
    resetPassword: "/password-reset/:token",
    home: "/",
    createList: "/create-list",
    createItem: "/create-item",
    lists: "/lists",
    list: "/list/:id",
    singleListUrl: (id: string) => `/list/${id}`,
    listItem: "/list/:listId/list-item/:listItemId",
    singleListItemUrl: (listId: string, listItemId: string) =>
      `/list/${listId}/list-item/${listItemId}`,
  },
  validation: {
    email: Yup.string().email("Invalid Email").required(REQUIRED_FIELD_ERROR),
    name: Yup.string()
      .min(2, REQUIRED_FIELD_TOO_SHORT_TEXT)
      .max(2000, REQUIRED_FIELD_TOO_LONG_TEXT),
    description: Yup.string().max(500, REQUIRED_FIELD_TOO_LONG_TEXT),
    password: Yup.string()
      .min(6, REQUIRED_FIELD_TOO_SHORT_TEXT)
      .max(50, REQUIRED_FIELD_TOO_LONG_TEXT)
      .required(REQUIRED_FIELD_ERROR),
  },
  googleAnalytics: {
    lists: 'lists',
    users: 'users'
  },
  colors: {
    default: "teal.500",
    defaultDark: "teal.500",
    themeDark: "dark",
  },
};
