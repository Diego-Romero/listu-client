import {
  CheckIcon,
  DragHandleIcon,
  EditIcon,
  RepeatClockIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { Divider, Flex, HStack, Box } from "@chakra-ui/layout";
import {
  Grid,
  IconButton,
  Spinner,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { ListItem, TentativeListItem } from "../type";
import { Draggable } from "react-beautiful-dnd";
import {
  UpdateListItemModal,
  UpdateListItemValues,
} from "./UpdateListItemModal";

interface Props {
  item: ListItem | TentativeListItem;
  listId: string;
  index: number;
  isActive: boolean;
  toggleItemDone: (itemIndex: number) => void;
  deleteListItem: (index: number) => void;
  updateListItemAttachmentUrl: (
    url: string,
    listId: string,
    itemId: string
  ) => void;
  updateListItem: (
    index: number,
    values: UpdateListItemValues
  ) => void;
}

export const ListItemRow: React.FC<Props> = ({
  item,
  listId,
  index,
  toggleItemDone,
  updateListItemAttachmentUrl,
  updateListItem,
  deleteListItem,
  isActive,
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
              textDecoration={item.done ? "line-through" : "inherit"}
              color={item.done ? "gray.500" : "inherit"}
              boxShadow={isActive ? "0px 2px 6px rgb(0 0 0 / 10%)" : "inherit"}
              borderColor={isActive ? "gray.200" : "inherit"}
              borderWidth={isActive ? "1px" : "inherit"}
              fontWeight={isActive ? "semibold" : "inherit"}
              _hover={{
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
                <Text fontSize="lg" noOfLines={1} ml={2} isTruncated>
                  {item.name}
                </Text>
              </Flex>
              <HStack cursor="pointer">
                {item.name}{" "}
                {item.loading ? <Spinner color="gray.500" size="sm" /> : null}
                {item.done ? (
                  <Tooltip label="Mark as undone">
                    <IconButton
                      variant="outline"
                      colorScheme="gray"
                      size="sm"
                      isRound
                      ml={2}
                      aria-label="Return item"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleItemDone(index);
                      }}
                      icon={<RepeatClockIcon />}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip label="Update item">
                    <IconButton
                      variant="outline"
                      colorScheme="gray"
                      size="sm"
                      isRound
                      ml={2}
                      aria-label="Update item"
                      onClick={onOpen}
                      icon={<EditIcon />}
                    />
                  </Tooltip>
                )}
                {item.done ? (
                  <Tooltip label={"Delete"}>
                    <IconButton
                      variant="outline"
                      isRound
                      colorScheme={"orange"}
                      size="sm"
                      ml={2}
                      aria-label="Toggle item done/undone"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteListItem(index);
                      }}
                      icon={<SmallCloseIcon />}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip label={"Mark as done"}>
                    <IconButton
                      variant="outline"
                      isRound
                      colorScheme={"teal"}
                      size="sm"
                      ml={2}
                      aria-label="Toggle item done/undone"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleItemDone(index);
                      }}
                      icon={<CheckIcon />}
                    />
                  </Tooltip>
                )}
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
        index={index}
        updateListItem={updateListItem}
      />
    </Box>
  );
};
