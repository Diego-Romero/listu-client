import { Flex } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { Heading } from "@chakra-ui/react";
import React from "react";

export const LoadingComponent: React.FC = () => {
  return (
    <Flex
      flexDir="column"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <CircularProgress isIndeterminate color="teal.400" />
      <Heading mt={4} size="md">
        Loading
      </Heading>
    </Flex>
  );
};
