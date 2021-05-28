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

/**
 * based on previous stored order in local storage, we would like to return them in that order,
 * if there are other lists that didn't exist there put them in a separate list at the end
 */
export function sortListsBasedOnPreviousOrder(lists: List[]): List[] {
  const orderString = localStorage.getItem(config.localStorage.listsOrder);
  // if no previous order exists, then ust return the list of lists
  if (!orderString) return lists;
  const orderObject: listOrderType = JSON.parse(orderString);
  let listsWithOrder = new Array(lists.length).fill(null);
  const otherLists: List[] = [];
  for (const list of lists) {
    const index = orderObject[list._id];
    if (index) listsWithOrder[index] = list;
    else otherLists.push(list);
  }
  listsWithOrder = listsWithOrder.filter((l) => l !== null);

  return [...listsWithOrder, ...otherLists];
}

export function storeListOrderInLocalStorage(items: List[]): void {
  const listsOrder: listOrderType = {};
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    listsOrder[item._id] = i;
  }

  localStorage.setItem(
    config.localStorage.listsOrder,
    JSON.stringify(listsOrder)
  );
}

export function storeActiveListInLocalStorage(listId): void {
  localStorage.setItem(config.localStorage.activeList, listId);
}
