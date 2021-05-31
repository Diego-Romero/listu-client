import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { Divider, Flex, HStack, Box, Stack } from "@chakra-ui/layout";
import { Collapse, IconButton, Link, Text } from "@chakra-ui/react";
import React from "react";
import { ListItem, TentativeListItem } from "../type";
import { longDateFormat } from "../utils/utils";
import { useHistory } from "react-router-dom";
import { config } from "../config";
import { IoMdUndo } from "react-icons/io";

interface Props {
  item: ListItem | TentativeListItem;
  toggleItemDone: (listId: string, itemId: string) => void;
  deleteItem: (id: string) => void;
  undone: boolean;
  listId: string;
}

export const ListItemRow: React.FC<Props> = ({
  item,
  deleteItem,
  undone: showUndone,
  listId,
  toggleItemDone,
}) => {
  const history = useHistory();
  return (
    <Box width="100%" cursor="pointer">
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={2}
        onClick={() =>
          history.push(config.routes.singleListItemUrl(listId, item._id))
        }
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
                  deleteItem(item._id);
                }}
                icon={<DeleteIcon />}
              />
            </>
          )}
        </HStack>
      </Flex>
      {/* <Collapse in={open} animateOpacity onClick={() => setOpen(false)}>
        <Stack px={2} pb={4} spacing={2}>
          <Box>
            <Text fontSize="sm">
              <b>Name:</b> {item.name}
            </Text>
            <Text fontSize="sm">
              <b>Created by:</b> {item.createdBy.name}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {longDateFormat(item.createdAt)}
            </Text>
          </Box>
          {item.description ? (
            <Text fontSize="sm" whiteSpace="pre-wrap">
              <strong>Description:</strong>
              <br />
              {item.description}
            </Text>
          ) : null}
          {item.attachmentUrl ? (
            <Link
              color="gray"
              fontSize="sm"
              href={item.attachmentUrl}
              isExternal
              onClick={(event) => event.stopPropagation()}
            >
              Download Image <ExternalLinkIcon mx="2px" />
            </Link>
          ) : null}
        </Stack>
      </Collapse> */}
      <Divider />
    </Box>
  );
};
