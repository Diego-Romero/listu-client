import { RepeatClockIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Divider, Flex, HStack, Box, Grid } from "@chakra-ui/layout";
import { IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ListItem, TentativeListItem } from "../type";

interface Props {
  item: ListItem | TentativeListItem;
  toggleItemDone: (listId: string, itemId: string) => void;
  deleteListItem: (listId: string, itemId: string) => void;
  listId: string;
}

export const DoneListItemRow: React.FC<Props> = ({
  item,
  listId,
  deleteListItem,
  toggleItemDone,
}) => {
  return (
    <Box width="100%">
      <Grid
        py={4}
        px={2}
        color={"gray.500"}
        textDecoration={"line-through"}
        justifyContent="center"
        alignItems="center"
        templateColumns="auto 1fr auto"
        onClick={(event) => {
          event.stopPropagation();
          toggleItemDone(listId, item._id);
        }}
        cursor="pointer"
        _hover={{
          fontWeight: "semibold",
          textDecor: "none",
          color: "inherit"
        }}
      >
        <RepeatClockIcon />
        <Flex
          flexDir="row"
          alignItems="baseline"
          justifyContent="flex-start"
          cursor="pointer"
          zIndex={1}
        >
          <Text fontSize="lg" noOfLines={1} ml={2}>
            {item.name}{" "}
          </Text>
        </Flex>
        <HStack cursor="pointer">
          <IconButton
            variant="outline"
            colorScheme="orange"
            size="sm"
            isRound
            aria-label="Delete item"
            onClick={(event) => {
              event.stopPropagation();
              deleteListItem(listId, item._id);
            }}
            icon={<SmallCloseIcon />}
          />
        </HStack>
      </Grid>
      <Divider />
    </Box>
  );
};
