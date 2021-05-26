import { Divider, Flex, Box, Text, HStack } from "@chakra-ui/layout";
import React from "react";
import { List } from "../type";

interface Props {
  list: List;
}

export const ListRow: React.FC<Props> = ({ list }) => {
  return (
    <Box>
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={4}
        cursor="pointer"
        _hover={{
          fontWeight: "semibold",
          textDecoration: "underline",
        }}
        onClick={() => console.log('hola')}
      >
        <HStack>
          <Text fontSize="lg" noOfLines={1} >{list.name} </Text>
        </HStack>
      </Flex>
      <Divider />
    </Box>
  );
};
