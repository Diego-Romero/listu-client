import {
  Badge,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/undraw_true_love_cy8x.svg";
import {
  CreateListItemForm,
  CreateListItemValues,
} from "../components/CreateItemForm";
import { List, ListItem as ListSingleItem } from "../type";
import { useParams } from "react-router-dom";
import {
  createListItemRequest,
  deleteListItemRequest,
  getListDataRequest,
  updateListItem,
} from "../api/requests";
import { createToast } from "../utils/utils";
import { AddFriendForm } from "../components/AddFriendForm";
import { AiOutlineUserAdd } from "react-icons/ai";
import { ListItemRow } from "../components/ListItemRow";
import { RepeatIcon } from "@chakra-ui/icons";

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
      await updateListItem(id, listItem._id, updatedListItem);
      await getListData();
      toast(createToast("Item marked as done 🙌", "success"));
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

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card loading={loading} maxHeight="400px">
        <Flex direction="row" align="center" justify="space-between" mb={4}>
          <Heading size="lg">{list ? list.name : "List"}</Heading>
          <HStack spacing={2}>
            <Icon
              as={RepeatIcon}
              cursor="pointer"
              onClick={() => getListData()}
              w={5}
              h={5}
            />
            <Icon
              as={AiOutlineUserAdd}
              cursor="pointer"
              onClick={onOpen}
              w={6}
              h={6}
            />
            <Badge
              onClick={() => toggleActiveItems()}
              cursor="pointer"
              colorScheme={showUndone ? "yellow" : "green"}
              variant="outline"
              fontSize="sm"
            >
              {showUndone ? "Undone" : "Done"}
            </Badge>
          </HStack>
        </Flex>

        {activeItems.length === 0 ? (
          <Box mt={6}>
            <Text>
              {showUndone
                ? "You do not seem to have any items in this list, maybe create a new one?"
                : "You do not have any done items."}
            </Text>
          </Box>
        ) : (
          <Box mt={4}>
            {activeItems.map((item) => (
              <ListItemRow
                item={item}
                key={item._id}
                deleteItem={deleteItem}
                showUndone={showUndone}
                updateListItemDoneState={updateListItemDoneState}
              />
            ))}
          </Box>
        )}
      </Card>
      <Box my={4}>
        <Card loading={loadingNewItem}>
          <Box>
            <Heading size="sm">Add a new item</Heading>
            <CreateListItemForm createNewItem={createNewItem} />
          </Box>
        </Card>
      </Box>
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
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
};
