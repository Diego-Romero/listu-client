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
  function toggleOpenState(event: React.MouseEvent) {
    event.stopPropagation();
    setOpen(!open);
  }
  return (
    <Box
      width="100%"
      cursor="pointer"
      onClick={() =>
        history.push(config.routes.singleListItemUrl(listId, item._id))
      }
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
          <Text fontSize="lg" noOfLines={1}>
            {item.name}{" "}
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
                zIndex={10}
                aria-label="Navigate to item"
                onClick={(event) => toggleOpenState(event)}
                icon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}
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
            <Text fontSize="sm">
              <b>Description:</b> {item.description}
            </Text>
          ) : null}
          {item.attachmentUrl ? (
            <Link
              color="gray"
              fontSize="sm"
              href={item.attachmentUrl}
              isExternal
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
