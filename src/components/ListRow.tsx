import { DragHandleIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import { Divider, Box, Text, HStack } from "@chakra-ui/layout";
import {
  Grid,
  IconButton,
  Tooltip,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { List, User } from "../type";
import { CreateListValues, UpdateListModal } from "./UpdateListModal";
import { Draggable } from "react-beautiful-dnd";

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
  deleteList
}) => {
  const {
    isOpen: isUpdateListModalOpen,
    onOpen: onUpdateListModalOpen,
    onClose: onUpdateListModalClose,
  } = useDisclosure();
  const { colorMode } = useColorMode();

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
        >
          <Grid
            gridTemplateColumns="auto 1fr auto"
            alignItems="center"
            justifyContent="center"
            py={4}
            px={4}
          >
            <DragHandleIcon cursor="grab" />
            <Text
              fontSize="md"
              ml={2}
              noOfLines={1}
              onClick={() => toggleActiveLists(list._id)}
              cursor="pointer"
            >
              {list.name}{" "}
            </Text>
            <HStack>
              <Tooltip label="Invite friends!">
                <IconButton
                  aria-label="Update list"
                  icon={<EditIcon />}
                  size="sm"
                  isRound
                  onClick={onUpdateListModalOpen}
                />
              </Tooltip>
              <Tooltip label="Display list">
                <IconButton
                  aria-label="Update list"
                  icon={<StarIcon />}
                  size="sm"
                  variant={active ? "solid" : "outline"}
                  colorScheme={
                    active ? (colorMode === "dark" ? "teal" : "teal") : "gray"
                  }
                  isRound
                  onClick={() => toggleActiveLists(list._id)}
                />
              </Tooltip>
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
