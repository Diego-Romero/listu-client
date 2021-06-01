import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";
import { CreateListItemForm, CreateListItemValues } from "./CreateItemForm";
import { List, ListItem, ListItemType } from "../type";
import { UndoneListItemRow } from "./UndoneListItemRow";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DoneListItemRow } from "./DoneListItemRow";
import {
  reorder,
  sortUndoneListItemsBasedOnPreviousOrder,
  splitListItems,
  storeListItemInLocalStorage,
} from "../utils/utils";

interface Props {
  onCreateItem: (listId: string, itemValues: CreateListItemValues) => void;
  toggleItemDone: (listId: string, itemId: string) => void;
  list: List;
  deleteListItem: (listId: string, itemId: string) => void;
  updateListItemAttachmentUrl: (url: string, listId: string, itemId: string) => void;
}

export const ListDisplay: React.FC<Props> = ({
  list,
  onCreateItem,
  toggleItemDone,
  deleteListItem,
  updateListItemAttachmentUrl,
}) => {
  const [undoneItems, setUndoneItems] = React.useState<ListItemType[]>([]);
  const [doneItems, setDoneItems] = React.useState<ListItemType[]>([]);
  const [loading] = React.useState(false);

  React.useEffect(() => {
    const { done, undone } = splitListItems(list.items);
    const undoneSorted = sortUndoneListItemsBasedOnPreviousOrder(
      undone,
      list._id
    );
    setDoneItems(done);
    setUndoneItems(undoneSorted);
    storeListItemInLocalStorage(undoneSorted, list._id);
  }, [list]);

  function onDragEnd(result) {
    if (!result.destination) return;

    const items: ListItem[] = reorder(
      undoneItems,
      result.source.index,
      result.destination.index
    );
    setUndoneItems(items);
    storeListItemInLocalStorage(items, list._id);
  }

  return (
    <Flex direction="column" justify="center" align="center" mx={8} mt={[8, 8, 16]}>
      <Card loading={loading} maxHeight="75vh">
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
        <CreateListItemForm createNewItem={onCreateItem} list={list} />

        {undoneItems.length === 0 && doneItems.length === 0 ? (
          <Box mt={6}>
            <Text>You do not have any items.</Text>
          </Box>
        ) : null}

        {undoneItems.length > 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list-items">
              {(provided) => (
                <Box
                  mt={4}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {undoneItems.map((item, index) => (
                    <UndoneListItemRow
                      item={item}
                      key={item._id}
                      listId={list._id}
                      toggleItemDone={toggleItemDone}
                      index={index}
                      updateListItemAttachmentUrl={updateListItemAttachmentUrl}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        )}
        {doneItems.map((item) => (
          <DoneListItemRow
            item={item}
            key={item._id}
            listId={list._id}
            deleteListItem={deleteListItem}
            toggleItemDone={toggleItemDone}
          />
        ))}
      </Card>
    </Flex>
  );
};
