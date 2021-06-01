import { CheckIcon, DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { Divider, Flex, HStack, Box } from "@chakra-ui/layout";
import {
  Grid,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { ListItem, TentativeListItem } from "../type";
import { Draggable } from "react-beautiful-dnd";
import { UpdateListItemModal } from "./UpdateListItemModal";

interface Props {
  item: ListItem | TentativeListItem;
  listId: string;
  index: number;
  toggleItemDone: (listId: string, itemId: string) => void;
  updateListItemAttachmentUrl: (
    url: string,
    listId: string,
    itemId: string
  ) => void;
}

export const UndoneListItemRow: React.FC<Props> = ({
  item,
  listId,
  index,
  toggleItemDone,
  updateListItemAttachmentUrl,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Draggable key={item._id} draggableId={item._id} index={index}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            width="100%"
          >
            <Grid
              justifyContent="center"
              alignItems="center"
              templateColumns="auto 1fr auto"
              py={4}
              px={2}
              cursor="grab"
              onClick={onOpen}
              _hover={{
                fontWeight: "semibold",
                textDecoration: "underline",
                bgColor: colorMode === "light" ? "gray.100" : "gray.900",
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
                onClick={onOpen}
              >
                <Text fontSize="lg" noOfLines={1} ml={2}>
                  {item.name}{" "}
                </Text>
              </Flex>
              <HStack cursor="pointer">
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  size="sm"
                  isRound
                  ml={2}
                  aria-label="Update item"
                  onClick={onOpen}
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
      <UpdateListItemModal
        modalClose={onClose}
        modalOpen={isOpen}
        listItem={item}
        updateListItemAttachmentUrl={updateListItemAttachmentUrl}
        listId={listId}
      />
    </Box>
  );
};
