import { VStack, Heading, Image, Text, Box, Button } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { config } from "../config";
import logo from "../images/icons/sleeping.svg";

export const FourOFourPage: React.FC = () => {
  const history = useHistory();
  return (
    <VStack spacing={12} textAlign="center">
      <Box>
        <Heading as="h1" size="lg">
          Yikes!
        </Heading>
        <Text mt={4}>This page does not exist...</Text>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={() => history.push(config.routes.home)}
        >
          Navigate Home
        </Button>
      </Box>
      <Image mt={12} boxSize="400px" src={logo} alt="Error" />
    </VStack>
  );
};
