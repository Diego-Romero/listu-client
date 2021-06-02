import {
  Box,
  Flex,
  Grid,
  Image,
  Heading,
  Stack,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { useUserContext } from "../context/UserContext";
import { useUiContext } from "../context/UiContext";
import {
  createListItemRequest,
  deleteListItemRequest,
  deleteListRequest,
  getUserRequest,
  updateListItemRequest,
  updateListRequest,
} from "../api/requests";
import {
  setActiveListFromLocalStorage,
  sortListsBasedOnPreviousOrder,
  storeActiveListInLocalStorage,
  toastConfig,
} from "../utils/utils";
import { List, ListItemType, TentativeListItem } from "../type";
import { LoadingComponent } from "../components/Loading";
import { SideNav } from "../components/SideNav";
import { CreateListItemValues } from "../components/CreateItemForm";
import { v4 as uuidv4 } from "uuid";
import logo from "../images/icons/team_up.svg";
import produce from "immer";
import { remove } from "ramda";
import { ListDisplay } from "../components/ListDisplay";
import { CreateListValues } from "../components/UpdateListModal";
import MouseTrap from "mousetrap";
import { UpdateListItemValues } from "../components/UpdateListItemModal";

export const ListsPage = () => {
  const { navBarOpen, setNavBarOpen } = useUiContext();
  const [loadingScreen, setLoadingScreen] = React.useState(true);
  const [lists, setLists] = React.useState<List[]>([]); // want to use this as the base of all truth for all of them, in order to avoid reload, and maintain a parallel state between server and lists
  const [activeList, setActiveList] = React.useState<List | null>(null);
  const { setUser, removeUser } = useUserContext();
  const toast = useToast();
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");

  React.useEffect(() => {
    fetchLists();
  }, []);

  React.useEffect(() => {
    reBindActiveListHotkeys();
  }, [lists]);

  function setHotKeyCommands() {
    MouseTrap.bind("ctrl+b", () => setNavBarOpen(false));
    MouseTrap.bind("ctrl+o", () => setNavBarOpen(true));
  }

  function reBindActiveListHotkeys() {
    MouseTrap.bind(`ctrl+1`, () => setActiveListHotKey(1));
    MouseTrap.bind(`ctrl+2`, () => setActiveListHotKey(2));
    MouseTrap.bind(`ctrl+3`, () => setActiveListHotKey(3));
    MouseTrap.bind(`ctrl+4`, () => setActiveListHotKey(4));
    MouseTrap.bind(`ctrl+5`, () => setActiveListHotKey(5));
    MouseTrap.bind(`ctrl+6`, () => setActiveListHotKey(6));
    MouseTrap.bind(`ctrl+7`, () => setActiveListHotKey(7));
    MouseTrap.bind(`ctrl+8`, () => setActiveListHotKey(8));
    MouseTrap.bind(`ctrl+9`, () => setActiveListHotKey(9));
  }

  function setActiveListHotKey(index: number) {
    if (index <= lists.length) setActiveList(lists[index - 1]);
  }

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
      if (activeList === null && lists.length > 0) setActiveList(lists[0]);
      setLoadingScreen(false);
      setHotKeyCommands();
    } catch (e) {
      // const errorMessage = e.response.data.message;
      toast(toastConfig("whoops, please log in again", "error"));
      removeUser(); // logout the user if can't fetch the details
    }
  };

  function toggleActiveLists(listId: string) {
    if (listId === activeList?._id) {
      setActiveList(null);
      return;
    }
    const index = findListIndexById(listId);
    setActiveList(lists[index]);
    storeActiveListInLocalStorage(listId);
    // if on mobile view, close the side nav when selecting a new active list
    if (!isLargerThan992) {
      setNavBarOpen(false);
    }
  }

  function findListIndexById(listId: string): number {
    return lists.findIndex((list) => list._id === listId);
  }

  async function updateList(listId: string, values: CreateListValues) {
    const snapshot = [...lists];
    const listIndex = findListIndexById(listId);
    const list = lists[listIndex];
    const updated = { ...list, ...values };
    setActiveList(updated);
    updateLists(listIndex, updated);
    try {
      await updateListRequest(values, list._id);
      toast(toastConfig("Whoop 🙌", "info", "List updated"));
    } catch (_err) {
      setLists(snapshot);
      toast(
        toastConfig(
          "Yikes..",
          "warning",
          "There has been an error updating your list, please try again later."
        )
      );
    }
  }

  async function deleteList(listId: string) {
    const snapshot = [...lists];
    console.log(listId);
    const listIndex = findListIndexById(listId);
    const updatedLists = remove(listIndex, 1, lists);
    setLists(updatedLists);
    if (activeList?._id === listId) setActiveList(null);
    try {
      await deleteListRequest(listId);
      toast(toastConfig("List deleted", "info"));
    } catch (_err) {
      setLists(snapshot);
      toast(
        toastConfig(
          "Yikes..",
          "warning",
          "There has been an error deleting your list, please try again later."
        )
      );
    }
  }

  /**
   * In order for the application to be snappy, I'm creating first a local record of the created item, with a unique id.
   * Then the item is being saved to be BE in parallel, when the item is saved it will be updated in React, but will be not be perceived by the user
   * If the request fails, I roll back to a snapshot before the item was created.
   */
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
      setLists(snapshot);
      toast(
        toastConfig(
          "Whoops, there has been an error saving your todo, please try again",
          "error"
        )
      );
    }
  }

  function updateLists(index: number, updatedList: List) {
    const nextState = produce(lists, (draft) => {
      draft[index] = updatedList;
    });
    setLists(nextState);
  }

  async function toggleItemDone(listId: string, itemId: string) {
    const snapshot = [...lists]; // taking a snapshot in case that rolling back is needed
    const listIndex = findListIndexById(listId);
    const list = lists[listIndex];
    const itemIndex = list.items.findIndex((item) => item._id === itemId);
    const item = list.items[itemIndex];
    const updatedListItem = { ...item, done: !item.done };
    const updatedItems = produce(list.items, (draft) => {
      draft[itemIndex] = updatedListItem;
    });
    const updatedList = { ...list, items: updatedItems };
    setActiveList(updatedList);
    updateLists(listIndex, updatedList);
    try {
      await updateListItemRequest(listId, itemId, updatedListItem);
    } catch (e) {
      setLists(snapshot);
      toast(
        toastConfig(
          "Whoops, there has been an error updating your todo, please try again",
          "error"
        )
      );
    }
  }

  async function updateListItem(
    listId: string,
    itemId: string,
    values: UpdateListItemValues
  ) {
    const snapshot = [...lists]; // taking a snapshot in case that rolling back is needed
    const listIndex = findListIndexById(listId);
    const list = lists[listIndex];
    const itemIndex = list.items.findIndex((item) => item._id === itemId);
    const item = list.items[itemIndex];
    const { name, description } = values;
    const updatedListItem = { ...item, name, description };
    const updatedItems = produce(list.items, (draft) => {
      draft[itemIndex] = updatedListItem;
    });
    const updatedList = { ...list, items: updatedItems };
    setActiveList(updatedList);
    updateLists(listIndex, updatedList);
    try {
      await updateListItemRequest(listId, itemId, updatedListItem);
    } catch (e) {
      setLists(snapshot);
      toast(
        toastConfig(
          "Whoops, there has been an error updating your todo, please try again",
          "error"
        )
      );
    }
  }

  async function deleteListItem(listId: string, itemId: string) {
    const snapshot = [...lists]; // taking a snapshot in case that rolling back is needed
    const listIndex = findListIndexById(listId);
    const list = lists[listIndex];
    const itemIndex = list.items.findIndex((item) => item._id === itemId);
    const updatedItems = remove(itemIndex, 1, list.items);
    const updatedList = { ...list, items: updatedItems };
    setActiveList(updatedList);
    updateLists(listIndex, updatedList);
    try {
      await deleteListItemRequest(listId, itemId);
    } catch (e) {
      setLists(snapshot);
      toast(
        toastConfig(
          "Whoops, there has been an error deleting your todo, please try again",
          "error"
        )
      );
    }
  }

  function updateListItemAttachmentUrl(
    url: string,
    listId: string,
    itemId: string
  ): void {
    const listIndex = findListIndexById(listId);
    const list = lists[listIndex];
    const listItemIndex = list.items.findIndex((l) => l._id === itemId);
    const item = list.items[listItemIndex];
    const updatedItem: ListItemType = { ...item, attachmentUrl: url };
    const updatedItems = produce(list.items, (draft) => {
      draft[listItemIndex] = updatedItem;
    });
    const updatedList = { ...list, items: updatedItems };
    setActiveList(updatedList);
    updateLists(listIndex, updatedList);
  }

  return (
    <Box height="100%">
      {loadingScreen ? (
        <LoadingComponent />
      ) : (
        <Grid
          height="100%"
          templateColumns={navBarOpen ? "auto 1fr" : "1fr"}
          width="100vw"
          overflow="auto"
          position="relative"
        >
          {navBarOpen ? (
            <SideNav
              lists={lists}
              updateList={updateList}
              setLists={setLists}
              toggleActiveLists={toggleActiveLists}
              activeList={activeList}
              setActiveList={setActiveList}
              deleteList={deleteList}
            />
          ) : null}
          <Flex
            height="100%"
            width="100%"
            alignItems="flex-start"
            justifyContent="center"
          >
            {activeList ? (
              <ListDisplay
                list={activeList}
                onCreateItem={createListItem}
                toggleItemDone={toggleItemDone}
                deleteListItem={deleteListItem}
                updateListItemAttachmentUrl={updateListItemAttachmentUrl}
                updateListItem={updateListItem}
              />
            ) : (
              <Stack textAlign="center">
                <Image mt={4} boxSize="400px" src={logo} alt="Login" />
                <Heading size="md">
                  Select a list from the side nav to get going
                </Heading>
              </Stack>
            )}
          </Flex>
        </Grid>
      )}
    </Box>
  );
};
