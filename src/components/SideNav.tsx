import {
  Box,
  Text,
  CloseButton,
  Divider,
  Flex,
  Grid,
  Heading,
  Stack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useUiContext } from "../context/UiContext";
import { useUserContext } from "../context/UserContext";
import { List } from "../type";
import { CreateListModal } from "./CreateListModal";
import { ListRow } from "./ListRow";

interface Props {
  lists: List[];
}

export const SideNav: React.FC<Props> = ({ lists }) => {
  const { setNavBarOpen } = useUiContext();
  const { user } = useUserContext();
  const {
    isOpen: isCreateListModalOpen,
    onOpen: onCreateListModalOpen,
    onClose: onCreateListModalClose,
  } = useDisclosure();
  return (
    <Grid
      height="100%"
      width={["100vw", "100vw", "40vw", "35vw", "25vw"]}
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
        <Stack overflowY="auto" maxH="70vh">
          {lists.map((list) => (
            <ListRow key={list._id} list={list} user={user} />
          ))}
        </Stack>
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
        />
      </Box>
    </Grid>
  );
};
