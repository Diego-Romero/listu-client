import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Divider, Flex, Heading, Box } from "@chakra-ui/layout";
import React from "react";
import { List } from "../type";

interface Props {
  list: List;
  navigateToList: (id: string) => void;
  ableToDelete: boolean;
  openDeleteListDialogue: (list: List) => void;
}

export const ListRow: React.FC<Props> = ({ list, navigateToList }) => {
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
        onClick={() => navigateToList(list._id)}
      >
        <Heading size="md">{list.name} </Heading>
        <ArrowForwardIcon ml={2} w={4} h={4} />
      </Flex>
      <Divider />
    </Box>
  );
};
