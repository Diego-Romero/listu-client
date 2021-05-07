import { ArrowForwardIcon, CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { GrRevert } from "react-icons/gr";
import { Divider, Flex, HStack, Box, Stack } from "@chakra-ui/layout";
import { Collapse, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ListItem } from "../type";
import { formatDate } from "../utils/utils";
import { useHistory } from "react-router-dom";
import { config } from "../config";

interface Props {
  item: ListItem;
  deleteItem: (id: string) => void;
  updateListItemDoneState: (listItem: ListItem, done: boolean) => void;
  showUndone: boolean;
}

export const ListItemRow: React.FC<Props> = ({
  item,
  deleteItem,
  updateListItemDoneState,
  showUndone,
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
          <Text fontSize="lg">{item.name} </Text>
          <Text color="gray.500" fontSize="xs" ml={2}>
            {formatDate(item.createdAt)}
          </Text>
        </Flex>
        <HStack cursor="pointer">
          {showUndone ? (
            <>
              <IconButton
                variant="outline"
                colorScheme="teal"
                size="sm"
                aria-label="Mark item as done"
                onClick={() => updateListItemDoneState(item, true)}
                icon={<CheckIcon />}
              />
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Navigate to item"
                onClick={() => history.push(config.routes.singleListItemUrl(item._id))}
                icon={<ArrowForwardIcon />}
              />
            </>
          ) : (
            <>
              <IconButton
                variant="solid"
                colorScheme="teal"
                size="sm"
                color="teal"
                aria-label="Move item to to-do"
                onClick={() => updateListItemDoneState(item, false)}
                icon={<GrRevert />}
              />
              <IconButton
                variant="outline"
                colorScheme="orange"
                size="sm"
                aria-label="Delete item"
                onClick={() => deleteItem(item._id)}
                icon={<DeleteIcon />}
              />
            </>
          )}
        </HStack>
      </Flex>
      <Collapse in={open} animateOpacity>
        <Stack px={2} pb={4} spacing={2}>
          <Box>
            <Text fontSize="sm">Created by: {item.createdBy.name}</Text>
          </Box>
          {item.description ? (
            <Text fontSize="md">
              <b>Description:</b> {item.description}
            </Text>
          ) : null}
        </Stack>
      </Collapse>
      <Divider />
    </Box>
  );
};
