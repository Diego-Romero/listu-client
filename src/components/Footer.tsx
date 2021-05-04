import { Flex, Heading } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
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
      <Heading size="sm">
        Made with ❤️ {"_"} by {" "}
        <Link href="https://www.linkedin.com/in/dev-diego-romero/" isExternal>
          Diego Romero {' '}
        </Link>
      </Heading>
    </Flex>
  );
}