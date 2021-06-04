import { DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { Divider, Box, Text, HStack } from "@chakra-ui/layout";
import {
  Grid,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Tooltip,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { List, User } from "../type";
import { CreateListValues, UpdateListModal } from "./UpdateListModal";
import { Draggable } from "react-beautiful-dnd";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AddFriendForm } from "./AddFriendForm";

interface Props {
  list: List;
  user: User;
  index: number;
  toggleActiveLists: (listId: string) => void;
  active: boolean;
  updateList: (listId: string, values: CreateListValues) => void;
  deleteList: (listId: string) => void;
}

export const ListRow: React.FC<Props> = ({
  list,
  user,
  index,
  toggleActiveLists,
  active,
  updateList,
  deleteList,
}) => {
  const {
    isOpen: isUpdateListModalOpen,
    onOpen: onUpdateListModalOpen,
    onClose: onUpdateListModalClose,
  } = useDisclosure();
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <Draggable key={list._id} draggableId={list._id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          _hover={{
            fontWeight: "semibold",
            textDecoration: "underline",
            bgColor: colorMode === "light" ? "gray.100" : "gray.900",
          }}
          cursor="pointer"
          onClick={() => toggleActiveLists(list._id)}
        >
          <Grid
            gridTemplateColumns="auto 1fr auto"
            alignItems="center"
            justifyContent="center"
            py={4}
            px={4}
            bg={
              active
                ? colorMode === "dark"
                  ? "gray.900"
                  : "gray.200"
                : "inherit"
            }
          >
            <DragHandleIcon cursor="grab" />
            <Text fontSize="md" ml={2} noOfLines={1} cursor="pointer">
              {list.name}{" "}
            </Text>
            <HStack>
              <Tooltip label="Update list">
                <IconButton
                  aria-label="Update list"
                  icon={<EditIcon />}
                  size="md"
                  isRound
                  variant="outline"
                  onClick={onUpdateListModalOpen}
                />
              </Tooltip>

              <Tooltip label="Add friend">
                <IconButton
                  aria-label="Add friend"
                  icon={<AiOutlineUserAdd />}
                  size="md"
                  colorScheme="teal"
                  variant="outline"
                  isRound
                  onClick={(event) => {
                    event.stopPropagation();
                    open();
                  }}
                />
              </Tooltip>
              <Popover
                isLazy
                placement="auto"
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={close}
                closeOnBlur={false}
              >
                <PopoverContent onClick={(e) => e.stopPropagation()}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody fontSize="sm">
                    <AddFriendForm list={list} />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          </Grid>
          <Divider />
          <UpdateListModal
            modalOpen={isUpdateListModalOpen}
            modalClose={onUpdateListModalClose}
            list={list}
            user={user}
            updateList={updateList}
            deleteList={deleteList}
          />
        </Box>
      )}
    </Draggable>
  );
};
