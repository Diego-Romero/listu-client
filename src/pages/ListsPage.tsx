import {
  Flex,
  Box,
  Grid,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useUserContext } from "../context/UserContext";
import { useUiContext } from "../context/UiContext";
import { getUserRequest } from "../api/requests";
import { toastConfig } from "../utils/utils";
import { List } from "../type";
import { LoadingComponent } from "../components/Loading";
import { SideNav } from "../components/SideNav";

export const ListsPage = () => {
  const { navBarOpen } = useUiContext();
  const [loadingScreen, setLoadingScreen] = React.useState(false);
  const [lists, setLists] = React.useState<List[]>([]);
  const { setUser, removeUser } = useUserContext();
  const toast = useToast();

  const fetchLists = async () => {
    setLoadingScreen(true);
    try {
      const req = await getUserRequest();
      setUser(req.data);
      setLists(req.data.lists);
      setLoadingScreen(false);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(toastConfig("whoops, please log in again", "error", errorMessage));
      removeUser(); // logout the user if can't fetch the details
    }
  };

  React.useEffect(() => {
    // hook to check if user has been authenticated
    fetchLists();
  }, []);

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
          {navBarOpen ? <SideNav lists={lists} /> : null}
          {/* navbar */}
          <Flex>body</Flex>
        </Grid>
      )}
    </Box>
  );
};
