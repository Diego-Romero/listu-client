import { Flex, Heading, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { List } from "../type";
import logo from "../images/icons/team_up.svg";
import { ListDisplay } from "./ListDisplay";
import { CreateListItemValues } from "./CreateItemForm";

interface Props {
  list: List | null;
  onCreateItem: (listId: string, itemValues: CreateListItemValues) => void;
  toggleItemDone: (listId: string, itemId: string) => void;
  deleteListItem: (listId: string, itemId: string) => void;
}

export const ListsDisplay: React.FC<Props> = ({
  list,
  onCreateItem,
  toggleItemDone,
  deleteListItem,
}) => {
  return (
    <Flex
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      {list === null ? (
        <Stack textAlign="center">
          <Image mt={4} boxSize="400px" src={logo} alt="Login" />
          <Heading size="md">
            Select a list from the side nav to get going
          </Heading>
        </Stack>
      ) : (
        <ListDisplay
          list={list}
          onCreateItem={onCreateItem}
          toggleItemDone={toggleItemDone}
          deleteListItem={deleteListItem}
        />
      )}
    </Flex>
  );
};
