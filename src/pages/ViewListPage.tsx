import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  Image,
  ListItem,
  Stack,
  Text,
  Tooltip,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import moment from "moment";
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
import { SettingsIcon } from "@chakra-ui/icons";
import { AddFriendForm } from "../components/AddFriendForm";

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
      toast(
        createToast(
          "whoops, there has been an error fetching the list",
          "error"
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
    } catch (_e) {
      toast(
        createToast(
          "Whoops, there has been an error creating the item :(",
          "error"
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
    } catch (e) {
      toast(
        createToast(
          "whoops, there has been an error deleting the item",
          "error"
        )
      );
      history.push(config.routes.login);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      {loading ? (
        <Heading>Loading</Heading>
      ) : (
        <Card maxW={"500px"}>
          <Flex direction="row" align="center" justify="space-between">
            <Heading size="lg">{list ? list.name : "List"}</Heading>
            <Tooltip
              label="Would you like to invite/remove friends to this list?"
              aria-label="Invite/remove friends"
          >
              <SettingsIcon cursor="pointer" w={4} h={4} onClick={onOpen} />
            </Tooltip>
          </Flex>
          {loadingNewItem ? (
            <Heading size="sm" mt={4}>
              Creating new item...
            </Heading>
          ) : (
            <CreateListItemForm createNewItem={createNewItem} />
          )}

          {items.length > 0 ? (
            <Accordion mt={4}>
              {items.map((item) => (
                <AccordionItem key={item._id} pt={2} pb={2}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Heading fontSize="lg">{item.name}</Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    {item.description ? (
                      <Box mt={2}>
                        <Text as="u">Description:</Text> {item.description}
                      </Box>
                    ) : null}
                    <Box mt={2}>
                      <Text as="u">Creation Date:</Text>{" "}
                      {moment(item.createdAt).format("Do MMMM YYYY")}
                    </Box>

                    <Stack direction="row" spacing={4} mt={6}>
                      <Tooltip label="Sweet!" aria-label="delete this todo">
                        <Button onClick={() => deleteItem(item._id)}>
                          Done
                        </Button>
                      </Tooltip>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Text mt={4}>You have no items!</Text>
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
      )}
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add a friend to this list</DrawerHeader>

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
