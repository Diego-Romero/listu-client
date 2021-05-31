import { CheckIcon, DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { Divider, Flex, HStack, Box } from "@chakra-ui/layout";
import { Grid, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ListItem, TentativeListItem } from "../type";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  item: ListItem | TentativeListItem;
  listId: string;
  index: number;
  toggleItemDone: (listId: string, itemId: string) => void;
}

export const UndoneListItemRow: React.FC<Props> = ({
  item,
  listId,
  index,
  toggleItemDone,
}) => {
  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          width="100%"
        >
          <Grid
            // flexDir="row"
            // alignItems="center"
            // justifyContent="space-between"
            justifyContent="center"
            alignItems="center"
            templateColumns="auto 1fr auto"
            py={4}
            px={2}
            cursor="grab"
            // onClick={() =>
            //   history.push(config.routes.singleListItemUrl(listId, item._id))
            // }
            _hover={{
              fontWeight: "semibold",
            }}
          >
            <DragHandleIcon cursor="grab" />
            <Flex
              flexDir="row"
              alignItems="baseline"
              justifyContent="flex-start"
              cursor="pointer"
              zIndex={1}
              textAlign="left"
              onClick={() => console.log("open modal here")}
            >
              <Text fontSize="lg" noOfLines={1} ml={2}>
                {item.name}{" "}
              </Text>
            </Flex>
            <HStack cursor="pointer">
              <IconButton
                variant="solid"
                colorScheme="gray"
                size="sm"
                isRound
                ml={2}
                aria-label="Mark item as done"
                onClick={() => console.log("open modal here")}
                icon={<EditIcon />}
              />
              <IconButton
                variant="outline"
                isRound
                colorScheme="teal"
                size="sm"
                ml={2}
                aria-label="Mark item as done"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleItemDone(listId, item._id);
                }}
                icon={<CheckIcon />}
              />
            </HStack>
          </Grid>
          <Divider />
        </Box>
      )}
    </Draggable>
  );
};
