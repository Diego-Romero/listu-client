import { VStack, Heading, Text, Button, Image } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import { config } from "../config";
import { useAuthenticatedContext } from "../context/AuthenticatedContext";
import logo from "../images/icons/landing.svg";

export const Landing: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthenticatedContext();

  return (
    <VStack spacing={6} mt={8} textAlign="center">
      <Heading as="h1" size="2xl">
        Listu
      </Heading>
      <Text fontSize="xl">
        The app to help you and your friends share lists.
      </Text>
      {user === null ? (
        <Button
          variant="outline"
          colorScheme="teal"
          size="lg"
          mb={4}
          onClick={() => history.push(config.routes.login)}
        >
          Login or Register
        </Button>
      ) : (
        <Button
          variant="outline"
          colorScheme="teal"
          size="lg"
          mb={4}
          onClick={() => history.push(config.routes.lists)}
        >
          Lists
        </Button>
      )}
      <Image mt={2} boxSize={["300px", "450px"]} src={logo} alt="Login" />
    </VStack>
  );
};
