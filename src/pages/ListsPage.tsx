import { Flex, Box, Grid, useToast } from "@chakra-ui/react";
import React from "react";
import { useUserContext } from "../context/UserContext";
import { useUiContext } from "../context/UiContext";
import { getUserRequest } from "../api/requests";
import {
  sortListsBasedOnPreviousOrder,
  storeActiveListInLocalStorage,
  toastConfig,
} from "../utils/utils";
import { List } from "../type";
import { LoadingComponent } from "../components/Loading";
import { SideNav } from "../components/SideNav";


export const ListsPage = () => {
  const { navBarOpen } = useUiContext();
  const [loadingScreen, setLoadingScreen] = React.useState(true);
  const [lists, setLists] = React.useState<List[]>([]); // want to use this as the base of all truth for all of them, in order to avoid reload, and mantain a parallel state between server and lists
  const [activeList, setActiveList] = React.useState<List | null>(null);
  const { setUser, removeUser } = useUserContext();
  const toast = useToast();

  const fetchLists = async () => {
    setLoadingScreen(true);
    try {
      const req = await getUserRequest();
      console.log(req.data)
      const user = req.data;
      const lists = req.data.lists;
      const sortedLists = sortListsBasedOnPreviousOrder(lists);
      setUser(user);
      setLists(sortedLists);
      // todo: need to set active lists based on local storage
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
    const index = lists.findIndex(list => list._id === listId)
    setActiveList(lists[index]);
    storeActiveListInLocalStorage(listId)
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
          {/* navbar */}
          <Flex>body</Flex>
        </Grid>
      )}
    </Box>
  );
};
