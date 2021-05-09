import { Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import logo from "../images/icons/contact.svg";

export const ForgotPasswordPage = () => {
  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card>
        <Heading size="lg" textAlign="center" mb={2}>
          Forgot password
        </Heading>
        <ForgotPasswordForm />
      </Card>
      <Image mt={4} boxSize="400px" src={logo} alt="Forgot Password" />
    </Flex>
  );
};
