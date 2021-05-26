import { DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { Divider, Flex, Box, Text, HStack } from "@chakra-ui/layout";
import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { List } from "../type";
import { UpdateListModal } from "./UpdateListModal";

interface Props {
  list: List;
}

export const ListRow: React.FC<Props> = ({ list }) => {
  const {
    isOpen: isUpdateListModalOpen,
    onOpen: onUpdateListModalOpen,
    onClose: onUpdateListModalClose,
  } = useDisclosure();
  return (
    <Box>
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={4}
      >
        <HStack>
          <DragHandleIcon cursor="grab" />
          <Text
            fontSize="md"
            noOfLines={1}
            cursor="pointer"
            _hover={{
              fontWeight: "semibold",
              textDecoration: "underline",
            }}
            onClick={() => console.log("hola")}
          >
            {list.name}{" "}
          </Text>
        </HStack>
        <Tooltip label="Update or invite friends to list">
          <IconButton
            aria-label="Update list"
            icon={<EditIcon />}
            size="sm"
            isRound
            variant="outline"
            onClick={onUpdateListModalOpen}
          />
        </Tooltip>
      </Flex>
      <Divider />
      <UpdateListModal
        modalOpen={isUpdateListModalOpen}
        modalClose={onUpdateListModalClose}
        list={list}
      />
    </Box>
  );
};
