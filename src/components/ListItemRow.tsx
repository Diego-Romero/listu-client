import {
  ArrowBackIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { Divider, Flex, HStack, Box, Stack } from "@chakra-ui/layout";
import { Collapse, IconButton, Link, Text } from "@chakra-ui/react";
import React from "react";
import { ListItem } from "../type";
import { longDateFormat } from "../utils/utils";
import { useHistory } from "react-router-dom";
import { config } from "../config";
import { IoMdUndo } from 'react-icons/io'

interface Props {
  item: ListItem;
  deleteItem: (id: string) => void;
  updateListItemDoneState: (
    event: React.MouseEvent,
    listItem: ListItem,
    done: boolean
  ) => void;
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
  function toggleOpenState(event: React.MouseEvent) {
    event.stopPropagation();
    setOpen(!open);
  }
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
                variant="outline"
                size="sm"
                zIndex={10}
                aria-label="Navigate to item"
                onClick={(event) => toggleOpenState(event)}
                icon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              />
              <IconButton
                variant="ghost"
                colorScheme="teal"
                size="sm"
                ml={2}
                aria-label="Mark item as done"
                onClick={(event) => updateListItemDoneState(event, item, true)}
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
                onClick={(event) => updateListItemDoneState(event, item, false)}
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
      <Collapse in={open} animateOpacity onClick={() => setOpen(false)}>
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
      </Collapse>
      <Divider />
    </Box>
  );
};
