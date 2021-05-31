import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Divider, Flex, HStack, Box } from "@chakra-ui/layout";
import { IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ListItem, TentativeListItem } from "../type";
import { IoMdUndo } from "react-icons/io";

interface Props {
  item: ListItem | TentativeListItem;
  toggleItemDone: (listId: string, itemId: string) => void;
  deleteListItem: (listId: string, itemId: string) => void;
  undone: boolean;
  listId: string;
}

export const ListItemRow: React.FC<Props> = ({
  item,
  undone: showUndone,
  listId,
  deleteListItem,
  toggleItemDone,
}) => {
  return (
    <Box width="100%" cursor="pointer">
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={2}
        // onClick={() =>
        //   history.push(config.routes.singleListItemUrl(listId, item._id))
        // }
        color={!showUndone ? "gray.500" : "inherit"}
        textDecoration={!showUndone ? "line-through" : "inherit"}
        _hover={{
          fontWeight: "semibold",
        }}
      >
        <Flex
          flexDir="row"
          alignItems="baseline"
          justifyContent="center"
          cursor="pointer"
          zIndex={1}
        >
          <Text fontSize="lg" noOfLines={1}>
            {item.name}{" "}
          </Text>
        </Flex>
        <HStack cursor="pointer">
          {showUndone ? (
            <>
              <IconButton
                variant="solid"
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
            </>
          ) : (
            <>
              <IconButton
                variant="ghost"
                colorScheme="teal"
                size="sm"
                color="gray"
                aria-label="Move item to to-do"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleItemDone(listId, item._id);
                }}
                icon={<IoMdUndo />}
              />
              <IconButton
                variant="ghost"
                colorScheme="red"
                size="sm"
                aria-label="Delete item"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteListItem(listId, item._id);
                }}
                icon={<DeleteIcon />}
              />
            </>
          )}
        </HStack>
      </Flex>
      <Divider />
    </Box>
  );
};
