import { UseToastOptions } from "@chakra-ui/react";
import moment from "moment";
import { config } from "../config";
import {
  List,
  ListItem,
  ListItemType,
  listOrderType,
  TentativeListItem,
} from "../type";

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

export function sortUndoneListItemsBasedOnPreviousOrder(
  undoneItems: ListItemType[],
  listId: string
): ListItemType[] {
  const orderString = localStorage.getItem(listId);
  if (!orderString || orderString === null) return undoneItems;

  const orderObject: listOrderType = JSON.parse(orderString);
  let itemsWithOrder = new Array(undoneItems.length).fill(null);
  const other: ListItemType[] = [];
  for (const item of undoneItems) {
    const index = orderObject[item._id];
    if (index !== undefined) itemsWithOrder[index] = item;
    else other.push(item);
  }
  itemsWithOrder = itemsWithOrder.filter((i) => i !== null);
  return [...itemsWithOrder, ...other];
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

export function storeListItemInLocalStorage(
  items: (ListItem | TentativeListItem)[],
  listId: string
): void {
  const listsOrder: listOrderType = {};
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    listsOrder[item._id] = i;
  }

  localStorage.setItem(listId, JSON.stringify(listsOrder));
}

export function storeActiveListInLocalStorage(listId): void {
  localStorage.setItem(config.localStorage.activeList, listId);
}

export function setActiveListFromLocalStorage(
  setActiveList: (list: List) => void,
  lists: List[]
): void {
  const activeListRecorded = localStorage.getItem(
    config.localStorage.activeList
  );
  if (activeListRecorded !== null) {
    const index = lists.findIndex((list) => list._id === activeListRecorded);
    setActiveList(lists[index]);
  }
}
export function splitListItems(
  items: ListItemType[]
): { done: ListItemType[]; undone: ListItemType[] } {
  const done: ListItemType[] = [],
    undone: ListItemType[] = [];
  for (const item of items) item.done ? done.push(item) : undone.push(item);

  return { done, undone };
}
