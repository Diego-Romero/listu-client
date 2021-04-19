import { VStack, Heading, Text, Button, Image } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import { config } from "../config";
import logo from "../images/icons/undraw_experience_design_eq3j.svg";

export const Landing: React.FC = () => {
  const history = useHistory();
  const isAuthenticated = false;
  return (
    <VStack spacing={6} mt={8} textAlign="center">
      <Heading as="h1" size="2xl">
        Listu
      </Heading>
      <Text fontSize="xl">
        The app to help you and your friends share lists.
      </Text>
      {isAuthenticated ? (
        <Button
          variant="outline"
          colorScheme={"yellow"}
          size="lg"
          mb={4}
          onClick={() => history.push(config.routes.lists)}
        >
          Go to my lists
        </Button>
      ) : (
        <Button
          variant="outline"
          colorScheme={"yellow"}
          size="lg"
          mb={4}
          onClick={() => history.push(config.routes.login)}
        >
          Login or Register
        </Button>
      )}
      <Image mt={4} boxSize="600px" src={logo} alt="Login" />
    </VStack>
  );
};
