import {
  Flex,
  Text,
  Heading,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Stack,
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

export const ListsPage = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
  const [alertDialogListId, setAlertDialogListId] = React.useState<string>('');
  const onClose = () => setAlertDialogOpen(false);
  const alertDialogCancelRef = React.useRef();

  const toast = useToast();
  const history = useHistory();

  React.useEffect(() => {
    setLoading(true);
    fetchUser();
  }, []);

  const handleClick = (id) => {
    const url = config.routes.singleListUrl(id);
    history.push(url);
  };

  const handleListDelete = async () => {
    setLoading(true);
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
      setLoading(false);
      setAlertDialogListId('')
      setAlertDialogOpen(false);
    }
  };

  const fetchUser = async () => {
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
      {loading || user === null ? (
        <Heading>Loading</Heading>
      ) : (
        <Card maxW={"500px"}>
          <Heading mt={2} size="md" textAlign="center">
            {user !== null && user.lists.length === 0
              ? "Uh Oh! You do not have any lists, you should create one!"
              : "Lists"}
          </Heading>
          <Accordion mt={4}>
            {user !== null && user.lists.length > 0
              ? user.lists.map((list) => (
                  <AccordionItem key={list._id} pt={2} pb={2}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Heading fontSize="lg">{list.name}</Heading>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      {list.description ? (
                        <Box mt={2}>
                          <Text as="u">Description:</Text> {list.description}
                        </Box>
                      ) : null}
                      <Stack direction="row" spacing={4} mt={6}>
                        <Button
                          variant="outline"
                          onClick={() => handleClick(list._id)}
                        >
                          Open
                        </Button>
                        {isListCreatedByCurrentUser(list) ? (
                          <Button
                            variant="outline"
                            color="red"
                            onClick={() => {
                              setAlertDialogOpen(true)
                              setAlertDialogListId(list._id)}
                            }
                          >
                            Delete
                          </Button>
                        ) : null}
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                ))
              : null}
          </Accordion>
          <Button
            mt={SPACING_BUTTONS}
            colorScheme="yellow"
            variant="outline"
            isFullWidth
            type="submit"
            onClick={() => history.push(config.routes.createList)}
          >
            Create a new shiny list!
          </Button>
        </Card>
      )}
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
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
              <Button colorScheme="red" onClick={() => handleListDelete()} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};
