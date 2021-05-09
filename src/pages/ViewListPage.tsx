import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  ListItem,
  Tag,
  TagLabel,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/landing2.svg";
import teamUpLogo from "../images/icons/team_up.svg";
import {
  CreateListItemForm,
  CreateListItemValues,
} from "../components/CreateItemForm";
import { List, ListItem as ListSingleItem } from "../type";
import { useHistory, useParams } from "react-router-dom";
import {
  createListItemRequest,
  deleteListItemRequest,
  deleteListRequest,
  getListDataRequest,
  updateListItemRequest,
} from "../api/requests";
import { createToast } from "../utils/utils";
import { AddFriendForm } from "../components/AddFriendForm";
import { AiOutlineUserAdd } from "react-icons/ai";
import { ListItemRow } from "../components/ListItemRow";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useAuthenticatedContext } from "../context/AuthenticatedContext";
import { config } from "../config";

interface ParamTypes {
  id: string;
}

export const ViewListPage = () => {
  const [undoneItems, setUndoneItems] = React.useState<ListSingleItem[]>([]);
  const [doneItems, setDoneItems] = React.useState<ListSingleItem[]>([]);
  const [activeItems, setActiveItems] = React.useState<ListSingleItem[]>([]);
  const [showUndone, setShowUndone] = React.useState<boolean>(true);
  const [list, setList] = React.useState<List | undefined>(undefined);
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams<ParamTypes>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthenticatedContext();
  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
  const alertDialogCancelRef = React.useRef();
  const history = useHistory();

  const [loadingNewItem, setLoadingNewItem] = React.useState(false);

  async function getListData() {
    setLoading(true);
    try {
      const listData = await getListDataRequest(id);
      setList(listData.data.list);
      setUndoneItems(listData.data.undone);
      setDoneItems(listData.data.done);
      setActiveItems(listData.data.undone);
      setShowUndone(true);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        createToast(
          "whoops, there has been an error fetching the list",
          "error",
          errorMessage
        )
      );
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getListData();
  }, []);

  const createNewItem = async (body: CreateListItemValues) => {
    setLoadingNewItem(true);
    try {
      await createListItemRequest(body, id);
      await getListData();
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        createToast(
          "Whoops, there has been an error creating the item :(",
          "error",
          errorMessage
        )
      );
    } finally {
      setLoadingNewItem(false);
    }
  };

  function toggleActiveItems() {
    if (showUndone) {
      setShowUndone(false);
      setActiveItems(doneItems);
    } else {
      setShowUndone(true);
      setActiveItems(undoneItems);
    }
  }

  async function deleteItem(itemId: string) {
    setLoading(true);
    try {
      await deleteListItemRequest(id, itemId);
      toast(createToast("List item deleted", "success"));
      await getListData();
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        createToast(
          "whoops, there has been an error deleting the item",
          "error",
          errorMessage
        )
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateListItemDoneState(
    listItem: ListSingleItem,
    done: boolean
  ) {
    setLoading(true);
    try {
      const updatedListItem: ListSingleItem = {
        ...listItem,
        done,
      };
      await updateListItemRequest(id, listItem._id, updatedListItem);
      await getListData();
      toast(createToast("Item moved", "success"));
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        createToast(
          "whoops, there has been an error deleting the item",
          "error",
          errorMessage
        )
      );
    } finally {
      setLoading(false);
    }
  }

  const handleListDelete = async () => {
    const declaredList = list as List;
    try {
      await deleteListRequest(declaredList._id);
      toast(createToast("List has been deleted successfully", "success"));
      history.push(config.routes.lists);
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
      setAlertDialogOpen(false);
    }
  };

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card loading={loading} maxHeight="400px">
        <Flex
          direction={["column", "column", "row"]}
          align={["start", "start", "center"]}
          justify="space-between"
          mb={4}
        >
          <Heading mb={[6, 6, 0]} size="lg" textOverflow="ellipsis">
            {list ? list.name : "List"}
          </Heading>
          <HStack spacing={3}>
            <Icon
              as={AiOutlineUserAdd}
              cursor="pointer"
              onClick={onOpen}
              w={6}
              h={6}
            />
            <Icon
              as={RepeatIcon}
              cursor="pointer"
              onClick={() => getListData()}
              w={5}
              h={5}
            />
            {user._id === list?.createdBy._id ? (
              <Icon
                as={DeleteIcon}
                cursor="pointer"
                onClick={() => setAlertDialogOpen(true)}
                w={5}
                h={5}
              />
            ) : null}
            <Tag
              size={"md"}
              variant="subtle"
              colorScheme="teal"
              cursor="pointer"
              onClick={() => toggleActiveItems()}
            >
              <TagLabel>{showUndone ? "show done" : "show todo"}</TagLabel>
            </Tag>
          </HStack>
        </Flex>

        {activeItems.length === 0 ? (
          <Box mt={6}>
            <Text>
              {showUndone
                ? "You do not have any items."
                : "You do not have any done items."}
            </Text>
          </Box>
        ) : (
          <Box mt={4}>
            {activeItems.map((item) => (
              <ListItemRow
                item={item}
                key={item._id}
                listId={list?._id as string}
                deleteItem={deleteItem}
                showUndone={showUndone}
                updateListItemDoneState={updateListItemDoneState}
              />
            ))}
          </Box>
        )}
      </Card>
      <Box mt={6} mb={4} w="100%">
        <Card loading={loadingNewItem}>
          <Box>
            <Heading size="sm">Add a new item</Heading>
            <CreateListItemForm createNewItem={createNewItem} />
          </Box>
        </Card>
      </Box>

      <Button
        mt={3}
        isFullWidth
        onClick={() => history.push(config.routes.lists)}
      >
        Back
      </Button>
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Invite a friend</DrawerHeader>

            <DrawerBody>
              <AddFriendForm refreshList={getListData} />
              <Box mt={8}>
                <Heading size="md">Current people in this list</Heading>
                <UnorderedList mt={4}>
                  {list?.users.map((user) => (
                    <ListItem key={user._id}>{user.email}</ListItem>
                  ))}
                </UnorderedList>
                {list && (
                  <Box mt={8}>
                    <Heading size="sm">List created by </Heading>
                    <Text mt={2}>
                      {list.createdBy.name} - {list.createdBy.email}
                    </Text>
                  </Box>
                )}
              </Box>
            </DrawerBody>
            <DrawerFooter>
              <Image mt={8} src={teamUpLogo} alt="Login" />
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

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
              <Button
                ref={alertDialogCancelRef}
                onClick={() => setAlertDialogOpen(false)}
              >
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
