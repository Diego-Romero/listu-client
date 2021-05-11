import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import { NewFriendForm } from "../components/NewFriendForm";
import { useAuthenticatedContext } from "../context/AuthenticatedContext";
import logo from "../images/icons/join.svg";

export const NewFriendPage = () => {
  const { logout } = useAuthenticatedContext();
  React.useEffect(() => {
    logout();
    localStorage.removeItem('token')
  }, [])
  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card>
        <Heading mb={4} size="lg">
          Register
        </Heading>
        <Text>
          <b>Note:</b> Your email has already been saved
        </Text>
        <NewFriendForm />
      </Card>
      <Image mt={4} boxSize="400px" src={logo} alt="New Friend" />
    </Flex>
  );
};
