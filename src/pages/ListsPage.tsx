import {
  Flex,
  Text,
  Heading,
  Image,
  Box,
  Button,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/undraw_team_up_ip2x.svg";
import { useHistory } from "react-router";
import { config, SPACING_BUTTONS } from "../config";
import { List, User } from "../type";
import { deleteListRequest, getUserRequest } from "../api/requests";
import { createToast } from "../utils/utils";
import { ListRow } from "../components/ListRow";

export const ListsPage = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
  const [alertDialogListId, setAlertDialogListId] = React.useState<string>("");
  const onClose = () => setAlertDialogOpen(false);
  const alertDialogCancelRef = React.useRef();
  const [loading, setLoading] = React.useState<boolean>(false);

  const toast = useToast();
  const history = useHistory();

  React.useEffect(() => {
    fetchUser();
  }, []);

  const handleClick = (id) => {
    const url = config.routes.singleListUrl(id);
    history.push(url);
  };

  const handleListDelete = async () => {
    try {
      await deleteListRequest(alertDialogListId);
      await fetchUser();
      toast(createToast("List has been deleted successfully", "success"));
    } catch (error) {
      const errorMessage = error.response.data.message;
      toast(
        createToast(
          "Whoops, there has been an error deleting the list.",
          "error",
          errorMessage
        )
      );
    } finally {
      setAlertDialogListId("");
      setAlertDialogOpen(false);
    }
  };

  const openDeleteListDialogue = (list: List) => {
    setAlertDialogListId(list._id);
    setAlertDialogOpen(true);
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await getUserRequest();
      setUser(data);
    } catch (_err) {
      toast(
        createToast(
          "Whoops, there has been an error fetching your lists",
          "error"
        )
      );
      history.push(config.routes.login);
    } finally {
      setLoading(false);
    }
  };

  function isListCreatedByCurrentUser(list: List): boolean {
    return list.createdBy._id === user?._id;
  }

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card maxW={"500px"} loading={loading} width="500px">
        <Heading mt={2} size="lg" textAlign="center" mb={4}>
          Your lists
        </Heading>
        {user !== null && user.lists.length > 0 ? (
          user.lists.map((list) => (
            <ListRow
              list={list}
              key={list._id}
              navigateToList={handleClick}
              ableToDelete={isListCreatedByCurrentUser(list)}
              openDeleteListDialogue={openDeleteListDialogue}
            />
          ))
        ) : (
          <Box>
            <Text>
              You do not seem to have any lists, maybe create a new one?
            </Text>
          </Box>
        )}
        <Button
          mt={SPACING_BUTTONS}
          colorScheme="yellow"
          variant="outline"
          isFullWidth
          type="submit"
          onClick={() => history.push(config.routes.createList)}
        >
          Create a new list
        </Button>
      </Card>
      <Image mt={4} boxSize="350px" src={logo} alt="Login" />
      <AlertDialog
        isOpen={alertDialogOpen}
        leastDestructiveRef={alertDialogCancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete list
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can not undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={alertDialogCancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleListDelete()}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};
