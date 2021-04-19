import * as Yup from "yup";

export const REQUIRED_FIELD_ERROR = "Required";
export const REQUIRED_FIELD_TOO_SHORT_TEXT = "Too Short!";
export const REQUIRED_FIELD_TOO_LONG_TEXT = "Too Long!";

export const NAME_MIN_LENGTH = 2;
export const PASSWORD_MIN_LENGTH = 6;

export const SPACING_INPUTS = 4;
export const SPACING_BUTTONS = 8;

export const config = {
  env: {
    auth0Domain: process.env.REACT_APP_AUTH_0_DOMAIN,
    auth0ClientId: process.env.REACT_APP_AUTH_0_CLIENT_ID,
    serverUrl: process.env.REACT_APP_SERVER_URL,
  },
  routes: {
    login: "/login",
    home: "/",
    createList: "/create-list",
    lists: "/lists",
    list: "/list/:id",
    createItem: "/create-item",
    singleListUrl: (id: string) => `/list/${id}`,
  },
  validation: {
    email: Yup.string().email("Invalid Email").required(REQUIRED_FIELD_ERROR),
    name: Yup.string()
      .min(2, REQUIRED_FIELD_TOO_SHORT_TEXT)
      .max(50, REQUIRED_FIELD_TOO_LONG_TEXT)
      .required(REQUIRED_FIELD_TOO_SHORT_TEXT),
    description: Yup.string().max(500, REQUIRED_FIELD_TOO_LONG_TEXT),
    password: Yup.string()
      .min(6, REQUIRED_FIELD_TOO_SHORT_TEXT)
      .max(50, REQUIRED_FIELD_TOO_LONG_TEXT)
      .required(REQUIRED_FIELD_ERROR),
  },
  colors: {
    default: "yellow.400",
    defaultDark: "yellow.500",
    themeDark: "dark",
  },
};

console.log(config);
