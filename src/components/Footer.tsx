import { Badge, Flex, Heading } from "@chakra-ui/layout";
import { Link, Stack } from "@chakra-ui/react";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <Flex
      width="100%"
      textAlign="center"
      alignContent="center"
      justifyContent="center"
      p="6"
    >
      <Stack>
        <Heading size="sm">
          Made with ☕️ {"_"} by{" "}
          <Link href="https://www.linkedin.com/in/dev-diego-romero/" isExternal>
            Diego Romero{" "}
          </Link>
        </Heading>
        <Flex alignItems="center" justifyContent="center" pt={2}>
          <Badge colorScheme="teal">BETA</Badge>
        </Flex>
      </Stack>
    </Flex>
  );
};
