import { VStack, Heading, Text, Button, Image } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import { config } from "../config";
import logo from "../images/icons/landing-teal.svg";

export const Landing: React.FC = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");

  return (
    <VStack spacing={6} mt={8} textAlign="center">
      <Heading
        as="h1"
        size="4xl"
        bgClip="text"
        bgGradient="linear(to-r, teal.500,green.500)"
      >
        Listu
      </Heading>
      <Text fontSize="xl">
        The app to help you and your friends share lists.
      </Text>
      {!token ? (
        <Button
          variant="outline"
          colorScheme="teal"
          color="white"
          bgGradient="linear(to-r, teal.500,green.500)"
          _hover={{
            bgGradient: "linear(to-r, teal.400, green.400)",
          }}
          size="lg"
          mb={4}
          onClick={() => history.push(config.routes.login)}
        >
          Login or Register
        </Button>
      ) : (
        <Button
          colorScheme="teal"
          size="lg"
          color="white"
          bgGradient="linear(to-r, teal.500,green.500)"
          _hover={{
            bgGradient: "linear(to-r, teal.400, green.400)",
          }}
          mb={4}
          onClick={() => history.push(config.routes.lists)}
        >
          Lists
        </Button>
      )}
      <Image mt={2} boxSize={["300px", "550px"]} src={logo} alt="Login" />
    </VStack>
  );
};
