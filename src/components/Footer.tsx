import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Box, Link, Stack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ContactFormModal } from "./ContactFormModal";

export const Footer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Flex
        width="100%"
        textAlign="center"
        alignContent="center"
        justifyContent="center"
        p="4"
        bgGradient="linear(to-r, teal.400,green.400)"
        color="white"
      >
        <Stack direction={["column", "column", "row"]} alignItems="center">
          <Heading size="sm">
            Made with ☕️ {"_"} by{" "}
            <Link
              href="https://www.linkedin.com/in/dev-diego-romero/"
              isExternal
            >
              Diego Romero
            </Link>
            {/* <Badge ml={4} colorScheme="teal">BETA</Badge> */}
          </Heading>
          <Text>
            <Link
              textDecoration="underline"
              onClick={onOpen}
            >
              get in touch
            </Link>
          </Text>
        </Stack>
      </Flex>
      <ContactFormModal modalOpen={isOpen} modalClose={onClose} />
    </Box>
  );
};
