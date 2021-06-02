import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import { NewFriendForm } from "../components/NewFriendForm";

export const NewFriendPage = () => {
  React.useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return (
    <Flex direction="column" justify="center" align="center" my={[8, 8, 12]} mx={4}>
      <Card>
        <Heading mb={4} size="lg">
          Register
        </Heading>
        <Text>
          <b>Note:</b> Your email has already been saved
        </Text>
        <NewFriendForm />
      </Card>
    </Flex>
  );
};
