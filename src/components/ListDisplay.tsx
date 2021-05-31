import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";
import { CreateListItemForm, CreateListItemValues } from "./CreateItemForm";
import { List, ListItem as ListSingleItem, TentativeListItem } from "../type";
import { ListItemRow } from "./ListItemRow";

interface Props {
  onCreateItem: (listId: string, itemValues: CreateListItemValues) => void;
  toggleItemDone: (listId: string, itemId: string) => void;
  list: List;
  deleteListItem: (listId: string, itemId: string) => void;
}

type ListItemType = ListSingleItem | TentativeListItem;

export const ListDisplay: React.FC<Props> = ({
  list,
  onCreateItem,
  toggleItemDone,
  deleteListItem,
}) => {
  const [undoneItems, setUndoneItems] = React.useState<ListItemType[]>([]);
  const [doneItems, setDoneItems] = React.useState<ListItemType[]>([]);
  const [loading] = React.useState(false);

  React.useEffect(() => {
    const done: ListItemType[] = [],
      undone: ListItemType[] = [];
    for (const item of list.items)
      item.done ? done.push(item) : undone.push(item);

    setDoneItems(done);
    setUndoneItems(undone);
  }, [list]);

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
          <HStack spacing={3}></HStack>
        </Flex>
        <CreateListItemForm createNewItem={onCreateItem} list={list} />

        {undoneItems.length === 0 && doneItems.length === 0 ? (
          <Box mt={6}>
            <Text>You do not have any items.</Text>
          </Box>
        ) : null}
        <Box mt={4}>
          {undoneItems.map((item) => (
            <ListItemRow
              item={item}
              key={item._id}
              listId={list?._id as string}
              undone
              deleteListItem={deleteListItem}
              toggleItemDone={toggleItemDone}
            />
          ))}
        </Box>
        {doneItems.map((item) => (
          <ListItemRow
            item={item}
            key={item._id}
            listId={list?._id as string}
            deleteListItem={deleteListItem}
            undone={false}
            toggleItemDone={toggleItemDone}
          />
        ))}
      </Card>
    </Flex>
  );
};
