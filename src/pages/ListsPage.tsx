import { Box, Grid, useToast } from "@chakra-ui/react";
import React from "react";
import { useUserContext } from "../context/UserContext";
import { useUiContext } from "../context/UiContext";
import { createListItemRequest, getUserRequest } from "../api/requests";
import {
  setActiveListFromLocalStorage,
  sortListsBasedOnPreviousOrder,
  storeActiveListInLocalStorage,
  toastConfig,
} from "../utils/utils";
import { List, TentativeListItem } from "../type";
import { LoadingComponent } from "../components/Loading";
import { SideNav } from "../components/SideNav";
import { ListsDisplay } from "../components/ListsDisplay";
import { CreateListItemValues } from "../components/CreateItemForm";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";

export const ListsPage = () => {
  const { navBarOpen } = useUiContext();
  const [loadingScreen, setLoadingScreen] = React.useState(true);
  const [lists, setLists] = React.useState<List[]>([]); // want to use this as the base of all truth for all of them, in order to avoid reload, and maintain a parallel state between server and lists
  const [activeList, setActiveList] = React.useState<List | null>(null);
  const { setUser, removeUser } = useUserContext();
  const toast = useToast();

  const fetchLists = async () => {
    setLoadingScreen(true);
    try {
      const req = await getUserRequest();
      const user = req.data;
      const lists = req.data.lists;
      const sortedLists = sortListsBasedOnPreviousOrder(lists);
      setUser(user);
      setLists(sortedLists);
      setActiveListFromLocalStorage(setActiveList, lists);
      setLoadingScreen(false);
    } catch (e) {
      // const errorMessage = e.response.data.message;
      toast(toastConfig("whoops, please log in again", "error"));
      removeUser(); // logout the user if can't fetch the details
    }
  };

  React.useEffect(() => {
    fetchLists();
  }, []);

  function toggleActiveLists(listId: string) {
    if (listId === activeList?._id) {
      setActiveList(null);
      return;
    }
    const index = findListIndexById(listId);
    setActiveList(lists[index]);
    storeActiveListInLocalStorage(listId);
  }

  function findListIndexById(listId): number {
    return lists.findIndex((list) => list._id === listId);
  }

  async function createListItem(
    listId: string,
    newItemValues: CreateListItemValues
  ) {
    const snapshot = [...lists]; // taking a snapshot in case that rolling back is needed
    const tentativeId = uuidv4();
    const newItem: TentativeListItem = {
      ...newItemValues,
      _id: tentativeId,
      done: false,
    };
    const listIndex = findListIndexById(listId);
    const list = lists[listIndex];
    const items = [newItem, ...list.items];
    const updatedList = { ...list, items };
    setActiveList(updatedList);
    updateLists(listIndex, updatedList);

    try {
      // update the item in the BE, if successful update the item in the list too
      const createdItem = await createListItemRequest(newItem, list._id);
      const itemIndex: number = items.findIndex(
        (item) => item._id === tentativeId
      );
      const updatedItem = produce(items, (draft) => {
        draft[itemIndex] = createdItem.data;
      });
      const updatedList = { ...list, items: updatedItem };
      setActiveList(updatedList);
      updateLists(listIndex, updatedList);
    } catch (e) {
      setLists(snapshot)
      toast(
        toastConfig(
          "Whoops, there has been an error saving your todo, please try again",
          "error",
        )
      );
      console.log(e);
    }
  }

  function updateLists(index: number, updatedList: List) {
    const nextState = produce(lists, (draft) => {
      draft[index] = updatedList;
    });
    setLists(nextState);
  }

  // todo: create delete list item
  // todo: create update list item
  // todo: fix update list is not loading

  // todo: create a mechanism for keeping the order of the list elements
  // todo: allow to have multiple lists at the same time
  // todo: keyboard functions to toggle lists, i.e. cmd 1, 2, 3, etc.
  // todo: create an auto pull mechanism to fetch the items of every list and check if have been updated

  return (
    <Box height="100%">
      {loadingScreen ? (
        <LoadingComponent />
      ) : (
        <Grid
          height="100%"
          templateColumns={navBarOpen ? "auto 1fr" : "1fr"}
          width="100vw"
          position="relative"
        >
          {navBarOpen ? (
            <SideNav
              lists={lists}
              setLists={setLists}
              toggleActiveLists={toggleActiveLists}
              activeList={activeList}
            />
          ) : null}
          <ListsDisplay list={activeList} onCreateItem={createListItem} />
        </Grid>
      )}
    </Box>
  );
};
