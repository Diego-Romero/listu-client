import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { Divider, Flex, HStack, Box, Stack } from "@chakra-ui/layout";
import { Collapse, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ListItem } from "../type";
import { longDateFormat, shortDateFormat } from "../utils/utils";
import { useHistory } from "react-router-dom";
import { config } from "../config";

interface Props {
  item: ListItem;
  deleteItem: (id: string) => void;
  updateListItemDoneState: (listItem: ListItem, done: boolean) => void;
  showUndone: boolean;
  listId: string;
}

export const ListItemRow: React.FC<Props> = ({
  item,
  deleteItem,
  updateListItemDoneState,
  showUndone,
  listId,
}) => {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  return (
    <Box
      cursor="pointer"
      onClick={() => setOpen(!open)}
      _hover={{
        fontWeight: "semibold",
      }}
    >
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={2}
      >
        <Flex
          flexDir="row"
          alignItems="baseline"
          justifyContent="center"
          cursor="pointer"
          zIndex={1}
        >
          <Text fontSize="lg" textOverflow="ellipsis">
            {item.name}{" "}
          </Text>
          <Text
            color="gray.500"
            fontSize="x-small"
            ml={2}
            display={["none", "none", "inline-block"]}
          >
            {shortDateFormat(item.createdAt)}
          </Text>
        </Flex>
        <HStack cursor="pointer">
          {showUndone ? (
            <>
              <IconButton
                variant="ghost"
                colorScheme="teal"
                size="sm"
                ml={2}
                aria-label="Mark item as done"
                onClick={() => updateListItemDoneState(item, true)}
                icon={<CheckIcon />}
              />
              <IconButton
                variant="outline"
                size="sm"
                aria-label="Navigate to item"
                onClick={() =>
                  history.push(
                    config.routes.singleListItemUrl(listId, item._id)
                  )
                }
                icon={<ArrowForwardIcon />}
              />
            </>
          ) : (
            <>
              <IconButton
                variant="ghost"
                colorScheme="red"
                size="sm"
                aria-label="Delete item"
                onClick={() => deleteItem(item._id)}
                icon={<DeleteIcon />}
              />
              <IconButton
                variant="ghost"
                colorScheme="teal"
                size="sm"
                color="teal"
                aria-label="Move item to to-do"
                onClick={() => updateListItemDoneState(item, false)}
                icon={<ArrowBackIcon />}
              />
            </>
          )}
        </HStack>
      </Flex>
      <Collapse in={open} animateOpacity>
        <Stack px={2} pb={4} spacing={2}>
          <Box>
            <Text fontSize="sm">Created by: {item.createdBy.name}</Text>
            <Text
              color="gray.500"
              fontSize="sm"
            >
              {longDateFormat(item.createdAt)}
            </Text>
          </Box>
          {item.description ? (
            <Text fontSize="sm">
              <b>Description:</b> {item.description}
            </Text>
          ) : null}
        </Stack>
      </Collapse>
      <Divider />
    </Box>
  );
};
