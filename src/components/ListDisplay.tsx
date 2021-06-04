import { Box, Flex, Heading, HStack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";
import { CreateListItemForm, CreateListItemValues } from "./CreateItemForm";
import { List, ListItemType, TentativeListItem } from "../type";
import { ListItemRow } from "./ListItemRow";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  reorder,
  sortListItemsBasedOnPreviousOrder,
  storeListItemInLocalStorage,
  toastConfig,
} from "../utils/utils";
import { UpdateListItemValues } from "./UpdateListItemModal";
import { useUiContext } from "../context/UiContext";
import MouseTrap from "mousetrap";
import produce from "immer";
import {
  createListItemRequest,
  deleteListItemRequest,
  getListDataRequest,
  updateListItemRequest,
} from "../api/requests";
import { v4 as uuidv4 } from "uuid";
import { remove } from "ramda";

interface Props {
  list: List;
}

let localIndex = -1;
export const ListDisplay: React.FC<Props> = ({ list }) => {
  const [items, setItems] = React.useState<ListItemType[]>([]);
  const { navBarOpen } = useUiContext();
  const [activeIndex, setActiveIndex] = React.useState(localIndex);
  const localLength = React.useRef(0);
  const toast = useToast();

  async function fetchList() {
    const res = await getListDataRequest(list._id);
    const sortedItems = sortListItemsBasedOnPreviousOrder(res.data.items, list._id);
    setItems(sortedItems);
  }

  // initial hook
  React.useEffect(() => {
    // if items exist in local storage set them, at the same time fetch the items from the list
    const sortedItems = sortListItemsBasedOnPreviousOrder(list.items, list._id);
    setItems(sortedItems);
    fetchList();
  }, [list]);

  // every time the items are updated store the order in local storage
  React.useEffect(() => {
    storeListItemInLocalStorage(items, list._id);
    localLength.current = items.length;
  }, [items]);

  // crud operations
  async function createListItem(newItemValues: CreateListItemValues) {
    const snapshot = [...items]; // taking a snapshot in case that rolling back is needed
    const tentativeId = uuidv4();
    const newItem: TentativeListItem = {
      ...newItemValues,
      _id: tentativeId,
      done: false,
      loading: true,
    };
    const updatedItems = [newItem, ...items];
    setItems(updatedItems);
    try {
      const res = await createListItemRequest(newItem, list._id);
      const itemIndex: number = updatedItems.findIndex(
        (item) => item._id === tentativeId
      );
      const itemsWithNewData = produce(updatedItems, (draft) => {
        draft[itemIndex] = res.data as TentativeListItem;
        draft[itemIndex].loading = false;
      });
      setItems(itemsWithNewData);
    } catch (e) {
      setItems(snapshot);
      toast(
        toastConfig(
          "Whoops, there has been an error saving your todo, please try again",
          "error"
        )
      );
    }
  }

  async function toggleItemDone(itemIndex: number) {
    const updatedItems = produce(items, (draft) => {
      draft[itemIndex].done = !draft[itemIndex].done;
    });
    setItems(updatedItems);
    try {
      const item = updatedItems[itemIndex];
      await updateListItemRequest(list._id, item._id, item);
    } catch (e) {
      toast(
        toastConfig(
          "Whoops, there has been an error updating your todo, please try again",
          "error"
        )
      );
    }
  }

  async function updateListItem(index: number, values: UpdateListItemValues) {
    const snapshot = [...items]; // taking a snapshot in case that rolling back is needed
    const item = items[index];
    const { name, description } = values;
    const updatedListItem = { ...item, name, description };
    const updatedItems = produce(items, (draft) => {
      draft[index] = updatedListItem;
    });
    setItems(updatedItems);
    try {
      await updateListItemRequest(list._id, item._id, updatedListItem);
    } catch (e) {
      setItems(snapshot);
      toast(
        toastConfig(
          "Whoops, there has been an error updating your item, please try again",
          "error"
        )
      );
    }
  }

  async function deleteListItem(index: number) {
    const snapshot = [...items]; // taking a snapshot in case that rolling back is needed
    const item = items[index];
    const updatedItems = remove(index, 1, items);
    setItems(updatedItems);
    try {
      await deleteListItemRequest(list._id, item._id);
    } catch (e) {
      setItems(snapshot);
      toast(
        toastConfig(
          "Whoops, there has been an error deleting your todo, please try again",
          "error"
        )
      );
    }
  }

  function updateListItemAttachmentUrl(url: string, index: string): void {
    const item = items[index];
    const updatedItem: ListItemType = { ...item, attachmentUrl: url };
    const updatedItems = produce(items, (draft) => {
      draft[index] = updatedItem;
    });
    setItems(updatedItems);
  }
  // -------------------------------------------------------------

  // key mappings
  React.useEffect(() => {
    MouseTrap.bind("up", () => moveSelected(-1));
    MouseTrap.bind("down", () => moveSelected(1));
    MouseTrap.bind("right", () => handleRightArrow());
  }, []);

  function handleRightArrow() {
    // const currentItem = items[localIndex];
    // // console.log(currentItem);
    // if (currentItem.done) {
    //   // console.log("deleting", currentItem);
    //   deleteListItem(list._id, currentItem._id);
    // } else {
    //   toggleItemDone(localIndex);
    // }
  }

  const moveSelected = (n: number) => {
    localIndex += n;
    if (localIndex < 0) localIndex = localLength.current - 1;
    else if (localIndex >= localLength.current) localIndex = 0;
    setActiveIndex(localIndex);
  };

  // move elements through list
  function onDragEnd(result) {
    if (!result.destination) return;

    const updatedOrder: ListItemType[] = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(updatedOrder);
  }

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      mx={8}
      my={[8, 8, 16]}
      display={navBarOpen ? ["none", "none", "none", "flex"] : "flex"}
      // width={[]} // todo: set the correct width depending on how wide the screen is
    >
      <Card maxHeight="75vh">
        <Flex
          direction={["column", "column", "row"]}
          align={["start", "start", "center"]}
          justify="space-between"
          mb={8}
        >
          <Heading mb={[6, 6, 0]} size="lg" noOfLines={1}>
            {list.name}
          </Heading>
          <HStack spacing={3}></HStack>
        </Flex>
        <CreateListItemForm createNewItem={createListItem} />

        {items.length === 0 ? (
          <Box mt={6}>
            <Text>You do not have any items.</Text>
          </Box>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list-items">
              {(provided) => (
                <Box
                  mt={4}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {items.map((item, index) => (
                    <ListItemRow
                      item={item}
                      key={item._id}
                      isActive={activeIndex === index}
                      listId={list._id}
                      toggleItemDone={toggleItemDone}
                      index={index}
                      updateListItemAttachmentUrl={updateListItemAttachmentUrl}
                      updateListItem={updateListItem}
                      deleteListItem={deleteListItem}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Card>
    </Flex>
  );
};
