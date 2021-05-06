import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Divider, Flex, Heading, HStack, Box, Stack } from "@chakra-ui/layout";
import { Collapse, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { ListItem } from "../type";
import { formatDate } from "../utils/utils";

interface Props {
  item: ListItem;
  deleteItem: (id: string) => void;
}

export const ListItemRow: React.FC<Props> = ({ item, deleteItem }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box>
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={2}
        cursor="pointer"
        _hover={{ backgroundColor: "gray.100" }}
        onClick={() => setOpen(!open)}
      >
        <Tooltip label="Mark item as done">
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="center"
            _hover={{ textDecoration: "underline", fontWeight: "bold" }}
            cursor="pointer"
            onClick={() => deleteItem(item._id)}
            zIndex={1}
          >
            <CheckIcon mr={2} w={4} h={4} />
            <Heading size="md">{item.name} </Heading>
            {/* <IconButton
              ml={2}
              aria-label="Mark item as done"
              variant="outline"
              size="sm"
              icon={<CheckIcon />}
            /> */}
          </Flex>
        </Tooltip>
        <HStack cursor="pointer">
          {open ? (
            <ChevronUpIcon w={6} h={6} onClick={() => setOpen(false)} />
          ) : (
            <Tooltip label="View list details">
              <ChevronDownIcon w={6} h={6} onClick={() => setOpen(true)} />
            </Tooltip>
          )}
        </HStack>
      </Flex>
      <Collapse in={open} animateOpacity>
        <Stack px={2} pb={4} spacing={2}>
          <Box>
            <Text fontSize="sm">Created by: {item.createdBy.name}</Text>
            <Text color="gray.500" fontSize="sm">
              {formatDate(item.createdAt)}
            </Text>
          </Box>
          {item.description ? (
            <Text fontSize="md">
              <b>Description:</b> {item.description}
            </Text>
          ) : null}
          <HStack>
            <Tooltip label="Mark item as done">
              <CheckIcon
                w={4}
                h={4}
                cursor="pointer"
                onClick={() => deleteItem(item._id)}
              />
            </Tooltip>
          </HStack>
        </Stack>
      </Collapse>
      <Divider />
    </Box>
  );
};
