import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { Divider, Flex, Heading, HStack, Box, Stack } from "@chakra-ui/layout";
import { Collapse, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { List } from "../type";
import { formatDate } from "../utils/utils";

interface Props {
  list: List;
  navigateToList: (id: string) => void;
  ableToDelete: boolean;
  openDeleteListDialogue: (list: List) => void;
}

export const ListRow: React.FC<Props> = ({
  list,
  navigateToList,
  ableToDelete,
  openDeleteListDialogue,
}) => {
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
        <Tooltip label="Navigate to list">
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="center"
            _hover={{ textDecoration: "underline", fontWeight: "bold" }}
            cursor="pointer"
            onClick={() => navigateToList(list._id)}
            zIndex={1}
          >
            <Heading size="md">{list.name} </Heading>
            <ExternalLinkIcon ml={2} w={4} h={4} />
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
          <Text fontSize="sm">
            Created by: {list.createdBy.name}
            <Text color="gray.500" fontSize="sm">
              {formatDate(list.createdAt)}
            </Text>
          </Text>
          {list.description ? (
            <Text fontSize="md">
              <b>Description:</b> {list.description}
            </Text>
          ) : null}
          <HStack>
            <Tooltip label="Navigate to list">
              <ExternalLinkIcon
                w={6}
                h={6}
                cursor="pointer"
                onClick={() => navigateToList(list._id)}
              />
            </Tooltip>
            {ableToDelete ? (
              <Tooltip label="Delete list">
                <DeleteIcon
                  ml={2}
                  w={5}
                  h={5}
                  cursor="pointer"
                  onClick={() => openDeleteListDialogue(list)}
                />
              </Tooltip>
            ) : null}
          </HStack>
        </Stack>
      </Collapse>
      <Divider />
    </Box>
  );
};
