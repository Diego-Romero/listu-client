import { VStack, Heading, Image } from "@chakra-ui/react";
import React from "react";
import logo from "../images/icons/undraw_team_collaboration_8eoc.svg";

export const FourOFourPage: React.FC = () => {
  return (
    <VStack spacing={6} mt={8} textAlign="center">
      <Heading as="h1" size="lg">
        Whoopsy daisy! We have encountered an error and are working on fixing
        it.
      </Heading>
      <Image mt={4} boxSize="400px" src={logo} alt="Error" />
    </VStack>
  );
};
