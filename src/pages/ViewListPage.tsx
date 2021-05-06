import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  Image,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/undraw_true_love_cy8x.svg";
import { config, SPACING_BUTTONS } from "../config";
import { useHistory } from "react-router";
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
} from "../api/requests";
import { createToast } from "../utils/utils";
import { AddFriendForm } from "../components/AddFriendForm";
import { AiOutlineUserAdd } from "react-icons/ai";
import { ListItemRow } from "../components/ListItemRow";

interface ParamTypes {
  id: string;
}

export const ViewListPage = () => {
  const history = useHistory();
  const [items, setItems] = React.useState<ListSingleItem[]>([]);
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
      setList(listData.data);
      setItems(listData.data.items);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        createToast(
          "whoops, there has been an error fetching the list",
          "error",
          errorMessage
        )
      );
      history.push(config.routes.login);
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

  async function deleteItem(itemId: string) {
    setLoading(true);
    try {
      await deleteListItemRequest(id, itemId);
      const listData = await getListDataRequest(id);
      setItems(listData.data.items);
      toast(createToast("List item deleted", "success"));
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

  // async function markItemAsDone(itemId: string) {
  //   setLoading(true);
  //   try {
  //     await deleteListItemRequest(id, itemId);
  //     const listData = await getListDataRequest(id);
  //     setItems(listData.data.items);
  //     toast(createToast("Item marked as done 🙌", "success"));
  //   } catch (e) {
  //     const errorMessage = e.response.data.message;
  //     toast(
  //       createToast(
  //         "whoops, there has been an error deleting the item",
  //         "error",
  //         errorMessage
  //       )
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card loading={loading}>
        <Flex direction="row" align="center" justify="space-between" mb={8}>
          <Heading size="lg">{list ? list.name : "List"}</Heading>
          <Tooltip
            label="Would you like to invite/remove friends to this list?"
            aria-label="Invite/remove friends"
          >
            <Icon
              as={AiOutlineUserAdd}
              cursor="pointer"
              onClick={onOpen}
              w={6}
              h={6}
            />
          </Tooltip>
        </Flex>
        {loadingNewItem ? (
          <Heading size="sm" mt={4}>
            Creating new item...
          </Heading>
        ) : (
          <CreateListItemForm createNewItem={createNewItem} />
        )}

        {items.length === 0 ? (
          <Box mt={6}>
            <Text>
              You do not seem to have any items in this list, maybe create a new
              one?
            </Text>
          </Box>
        ) : (
          <Box mt={4}>
            {items.map((item) => (
              <ListItemRow item={item} key={item._id} deleteItem={deleteItem}/>
            ))}
          </Box>
        )}

        <Button
          mt={SPACING_BUTTONS}
          variant="outline"
          isFullWidth
          onClick={() => history.push(config.routes.lists)}
        >
          Back
        </Button>
      </Card>
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
