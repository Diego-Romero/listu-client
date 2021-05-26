import {
  Flex,
  Heading,
  Box,
  Button,
  Grid,
  CloseButton,
  Stack,
  Divider,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { ListRow } from "../components/ListRow";
import { useUserContext } from "../context/UserContext";
import { CreateListModal } from "../components/CreateListModal";
import { useUiContext } from "../context/UiContext";
import { getUserRequest } from "../api/requests";
import { toastConfig } from "../utils/utils";
import { List } from "../type";
import { LoadingComponent } from "../components/Loading";

export const ListsPage = () => {
  const { navBarOpen, setNavBarOpen } = useUiContext();
  const [loadingScreen, setLoadingScreen] = React.useState(false);
  const [lists, setLists] = React.useState<List[]>([]);
  const {
    isOpen: isCreateListModalOpen,
    onOpen: onCreateListModalOpen,
    onClose: onCreateListModalClose,
  } = useDisclosure();
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
          {navBarOpen ? (
            <Grid
              height="100%"
              width={['100vw', '100vw', '40vw', '35vw', '25vw']}
              templateRows="auto 1fr auto"
              boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)"
              borderRightColor="gray.200"
              borderRightWidth="1px"
            >
              <Box>
                <Flex alignItems="center" justifyContent="space-between" p={4}>
                  <Heading size="md">Lists</Heading>
                  <CloseButton onClick={() => setNavBarOpen(false)} />
                </Flex>
                <Divider />
              </Box>
              <Stack overflowY="auto" maxH="70vh">
                {lists.map((list) => (
                  <ListRow key={list._id} list={list} />
                ))}
              </Stack>
              <Box p={4}>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  isFullWidth
                  onClick={onCreateListModalOpen}
                >
                  New List
                </Button>
              </Box>
            </Grid>
          ) : null}
          {/* navbar */}
          <Flex>body</Flex>
        </Grid>
      )}
      <CreateListModal
        modalOpen={isCreateListModalOpen}
        modalClose={onCreateListModalClose}
        lists={lists}
      />
    </Box>
  );
};
