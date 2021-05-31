import axios from "axios";
import { AddFriendFormValues } from "../components/AddFriendForm";
import { CreateListItemValues } from "../components/CreateItemForm";
import { ForgotPasswordValues } from "../components/ForgotPasswordForm";
import { LoginFormValues } from "../components/LoginForm";
import { RegisterFriendFormTypes } from "../components/NewFriendForm";
import { config } from "../config";
import { CreateListValues } from "../components/CreateListModal";
import { ResetPasswordFormTypes } from "../pages/ResetPasswordPage";
import { ListItem } from "../type";

const axiosInstance = axios.create({
  baseURL: config.env.serverUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});

export const registerRequest = async (values) => {
  const url = `/user/register`;
  return axiosInstance.post(url, values);
};

export const registerFriendRequest = async (
  values: RegisterFriendFormTypes,
  id: string
) => {
  const url = `/user/friend/register/${id}`;
  return axiosInstance.post(url, values, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const loginRequest = async (values: LoginFormValues) => {
  const url = `${config.env.serverUrl}/user/login`;
  return axiosInstance.post(url, values, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getUserRequest = async () => {
  const url = `/user/me`;
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const createListRequest = async (values: CreateListValues) => {
  const url = `/lists`;
  return axiosInstance.post(url, values, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateListRequest = async (values: CreateListValues, id: string) => {
  const url = `/lists/${id}`;
  return axiosInstance.patch(url, values, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const createListItemRequest = async (
  values: CreateListItemValues,
  listId: string
) => {
  const url = `/lists/${listId}`;
  return axiosInstance.post(url, values, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateListItemRequest = async (
  listId: string,
  itemId: string,
  listItem: ListItem
) => {
  const url = `/lists/${listId}/done/${itemId}`;
  return axiosInstance.post(url, listItem, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const deleteListItemRequest = async (listId: string, itemId: string) => {
  const url = `/lists/${listId}/${itemId}`;
  return axiosInstance.delete(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getListDataRequest = async (id: string) => {
  const url = `/lists/${id}`;
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
export const getListItemRequest = async (id: string) => {
  const url = `/lists/list-item/${id}`;
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const addFriendRequest = async (
  values: AddFriendFormValues,
  listId: string
) => {
  const url = `/user/friend/${listId}`;
  return axiosInstance.post(url, values, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const deleteListRequest = async (listId: string) => {
  const url = `/lists/${listId}`;
  return axiosInstance.delete(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const forgotPasswordRequest = async (values: ForgotPasswordValues) => {
  const url = `/user/forgot-password`;
  return axiosInstance.post(url, values);
};

export const resetPasswordRequest = async (
  values: ResetPasswordFormTypes,
  token: string
) => {
  const url = `/user/reset-password/${token}`;
  return axiosInstance.post(url, values);
};

export const sendContactMessageRequest = async (values: ContactFormValues) => {
  const url = `/user/contact`;
  return axiosInstance.post(url, values);
};

export const getSignedUrlRequest = async (
  listId: string,
  listItemId: string,
  fileName: string
) => {
  const url = `/lists/${listId}/${listItemId}/upload`;
  return axiosInstance.post(url, { name: fileName });
};

export const putFileToS3 = async (file: File, url: string) => {
  return axios.put(url, file);
};
