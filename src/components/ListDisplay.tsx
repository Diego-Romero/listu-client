import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";
import { CreateListItemForm, CreateListItemValues } from "./CreateItemForm";
import { List, ListItem as ListSingleItem, TentativeListItem } from "../type";
import { toastConfig } from "../utils/utils";
import { ListItemRow } from "./ListItemRow";
import { useUserContext } from "../context/UserContext";

interface Props {
  onCreateItem: (listId: string, itemValues: CreateListItemValues) => void;
  list: List;
}
type ListItemType = (ListSingleItem | TentativeListItem);

export const ListDisplay: React.FC<Props> = ({ list, onCreateItem }) => {
  const [undoneItems, setUndoneItems] = React.useState<
    ListItemType[]
  >([]);
  const [doneItems, setDoneItems] = React.useState<ListItemType[]>([]);
  const toast = useToast();
  const [loading] = React.useState(false);

  React.useEffect(() => {
    const done: ListItemType[] = [],
      undone: ListItemType[] = [];
    for (const item of list.items)
      item.done ? done.push(item) : undone.push(item);

    setDoneItems(done);
    setUndoneItems(undone);
  }, [list]);

  const createNewItem = async (body: CreateListItemValues) => {
    console.log('reaching')
    try {
      const newItem: TentativeListItem = {
        ...body,
        _id: list.items.length.toString(),
        done: false,
      };
      setUndoneItems([newItem, ...undoneItems]);
      console.log(undoneItems)
      // await createListItemRequest(body, list._id); // todo: return the updated item and update it on the list
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        toastConfig(
          "Whoops, there has been an error creating the item :(",
          "error",
          errorMessage
        )
      );
    }
  };

  async function deleteItem(itemId: string) {
    // setLoading(true);
    // try {
    //   await deleteListItemRequest(id, itemId);
    //   toast(toastConfig("List item deleted", "success"));
    //   await getListData();
    // } catch (e) {
    //   const errorMessage = e.response.data.message;
    //   toast(
    //     toastConfig(
    //       "whoops, there has been an error deleting the item",
    //       "error",
    //       errorMessage
    //     )
    //   );
    // } finally {
    //   setLoading(false);
    // }
  }

  async function updateListItemDoneState(
    event: React.MouseEvent,
    listItem: ListSingleItem,
    done: boolean
  ) {
    // event.stopPropagation();
    // setLoading(true);
    // try {
    //   const updatedListItem: ListSingleItem = {
    //     ...listItem,
    //     done,
    //   };
    //   await updateListItemRequest(id, listItem._id, updatedListItem);
    //   await getListData();
    //   toast(toastConfig("Item moved", "success"));
    // } catch (e) {
    //   const errorMessage = e.response.data.message;
    //   toast(
    //     toastConfig(
    //       "whoops, there has been an error deleting the item",
    //       "error",
    //       errorMessage
    //     )
    //   );
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card loading={loading} maxHeight="70vh">
        <Flex
          direction={["column", "column", "row"]}
          align={["start", "start", "center"]}
          justify="space-between"
          mb={8}
        >
          <Heading mb={[6, 6, 0]} size="md" noOfLines={1}>
            {list.name}
          </Heading>
          <HStack spacing={3}>
            {/* <Icon
              as={AiOutlineUserAdd}
              cursor="pointer"
              onClick={onOpen}
              w={6}
              h={6}
            /> */}
            {/* loading icon should go in here */}
          </HStack>
        </Flex>
        <CreateListItemForm createNewItem={onCreateItem} list={list} />

        {undoneItems.length === 0 ? (
          <Box mt={6}>
            <Text>You do not have any items.</Text>
          </Box>
        ) : (
          <Box mt={4}>
            {undoneItems.map((item) => (
              <ListItemRow
                item={item}
                key={item._id}
                listId={list?._id as string}
                deleteItem={deleteItem}
                showUndone
                updateListItemDoneState={updateListItemDoneState}
              />
            ))}
            {doneItems.map((item) => (
              <ListItemRow
                item={item}
                key={item._id}
                listId={list?._id as string}
                deleteItem={deleteItem}
                showUndone={false}
                updateListItemDoneState={updateListItemDoneState}
              />
            ))}
          </Box>
        )}
      </Card>
    </Flex>
  );
};
