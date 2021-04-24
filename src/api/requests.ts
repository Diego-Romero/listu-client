import axios from "axios";
import { LoginFormValues } from "../components/LoginForm";
import { config } from "../config";
import { CreateListValues } from "../pages/CreateListPage";

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
  const url = `${config.env.serverUrl}/user/login`;
  return axios.post(url, values, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
  });
};

export const logoutRequest = async () => {
  const url = `/user/logout`;
  return axiosInstance.post(url);
};

export const getUserRequest = async () => {
  const url = `/user/me`;
  return axiosInstance.get(url);
}

export const createListRequest = async (values: CreateListValues) => {
  const url =`/lists`
  return axiosInstance.post(url, values)
}

export const getListDataRequest = async (id: string) => {
  const url =`/lists/${id}`
  return axiosInstance.get(url)
}