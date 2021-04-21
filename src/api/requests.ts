import axios from "axios";
import { LoginFormValues } from "../components/LoginForm";
import { config } from "../config";

const axiosInstance = axios.create({
  baseURL: config.env.serverUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
});

export const registerRequest = async (values) => {
  const url = `/user/register`;
  return axiosInstance.post(url, values);
};

export const loginRequest = async (values: LoginFormValues) => {
  const url = `/user/login`;
  return axiosInstance.post(url, values, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
  });
};

export const logoutRequest = async () => {
  const url = `/user/logout`;
  return axiosInstance.post(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    }
  );
};

export const getUserRequest = async () => {
  const url = `/user/me`;
return axiosInstance.get(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
  });
};
