import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Divider, Flex, Box, Text, HStack } from "@chakra-ui/layout";
import React from "react";
import { List } from "../type";

interface Props {
  list: List;
  navigateToList: (id: string) => void;
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
        _hover={{
          fontWeight: "semibold",
          textDecoration: 'underline'
        }}
        onClick={() => navigateToList(list._id)}
      >
        <HStack>
          <Text fontSize="lg">{list.name} </Text>
          {/* <Text fontSize="x-small">{shortDateFormat(list.createdAt)} </Text> */}
        </HStack>
        <ArrowForwardIcon ml={2} w={4} h={4} />
      </Flex>
      <Divider />
    </Box>
  );
};
