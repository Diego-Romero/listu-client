import { UseToastOptions } from "@chakra-ui/react";
import moment from "moment";
import { config } from "../config";
import { List, listOrderType } from "../type";

export function shortDateFormat(date: Date) {
  return moment(date).format("Do-MMM");
}

export function longDateFormat(date: Date) {
  return moment(date).format("Do-MMM-YYYY h:mm a");
}

export function toastConfig(
  title: string,
  status: "success" | "error" | "info" | "warning",
  description = ""
): UseToastOptions {
  return {
    title,
    position: "bottom",
    description,
    status,
    duration: 2000,
    isClosable: true,
  };
}

export function reorder(list: any[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export function sortListsBasedOnPreviousOrder(lists: List[]): List[] {
  const orderString = localStorage.getItem(config.localStorage.listsOrder);
  // if no previous order exists, then ust return the list of lists
  if (!orderString) return lists;
  const orderObject: listOrderType = JSON.parse(orderString);
  const result = new Array(lists.length).fill(null);
  for (const list of lists) {
    const index = orderObject[list._id];
    result[index] = list;
  }

  return result;
}
