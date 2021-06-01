import {
  Box,
  Text,
  CloseButton,
  Divider,
  Flex,
  Grid,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useUiContext } from "../context/UiContext";
import { useUserContext } from "../context/UserContext";
import { List, User } from "../type";
import { CreateListModal } from "./CreateListModal";
import { ListRow } from "./ListRow";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { reorder, storeListOrderInLocalStorage } from "../utils/utils";
import { CreateListValues } from "./UpdateListModal";

interface Props {
  lists: List[];
  setLists: (lists: List[]) => void;
  toggleActiveLists: (listId: string) => void;
  setActiveList: (list: List) => void;
  activeList: List | null;
  updateList: (listId: string, values: CreateListValues) => void;
  deleteList: (listId: string) => void;
}

export const SideNav: React.FC<Props> = ({
  lists,
  setLists,
  toggleActiveLists,
  activeList,
  setActiveList,
  updateList,
  deleteList,
}) => {
  const { setNavBarOpen } = useUiContext();
  const { user } = useUserContext();
  const {
    isOpen: isCreateListModalOpen,
    onOpen: onCreateListModalOpen,
    onClose: onCreateListModalClose,
  } = useDisclosure();

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: List[] = reorder(
      lists,
      result.source.index,
      result.destination.index
    );

    setLists(items);
    // persist the current order in local storage, so when page loads the order remains
    storeListOrderInLocalStorage(items);
  }

  function isListActive(list: List): boolean {
    if (!activeList || activeList === null) return false;
    return activeList._id === list._id;
  }

  return (
    <Grid
      height="100%"
      width={["100vw", "100vw", "100vw", "35vw", "25vw"]}
      templateRows="auto 1fr auto"
      boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)"
      borderRightColor="gray.200"
      borderRightWidth="1px"
    >
      <Box>
        <Flex alignItems="center" justifyContent="space-between" p={4}>
          <Heading size="md">Lists</Heading>
          <CloseButton onClick={() => setNavBarOpen(false)} />
        </Flex>
        <Divider />
      </Box>
      {lists.length === 0 ? (
        <Text size="sm" textAlign="center" mt={6}>
          You do not have any lists
        </Text>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="lists">
            {(provided) => (
              <Box
                overflowY="auto"
                maxH="70vh"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((list, index) => (
                  <ListRow
                    key={list._id}
                    list={list}
                    user={user as User}
                    index={index}
                    toggleActiveLists={toggleActiveLists}
                    active={isListActive(list)}
                    updateList={updateList}
                    deleteList={deleteList}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <Box p={4}>
        <Button
          colorScheme="teal"
          variant="outline"
          isFullWidth
          onClick={onCreateListModalOpen}
        >
          New List
        </Button>
        <CreateListModal
          modalOpen={isCreateListModalOpen}
          modalClose={onCreateListModalClose}
          lists={lists}
          setActiveList={setActiveList}
        />
      </Box>
    </Grid>
  );
};
