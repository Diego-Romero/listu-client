import {
  Flex,
  Heading,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import logo from "../images/icons/team_up.svg";

export const ResetPasswordPage = () => {
  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card>
        <Heading size="lg" textAlign="center" mb={2}>Reset password</Heading>
        <ResetPasswordForm />
      </Card>
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
    </Flex>
  );
};
