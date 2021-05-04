import {
  Flex,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import logo from "../images/icons/undraw_join_of2w.svg";

export const ResetPasswordPage = () => {
  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card maxW={"500px"}>
        <ResetPasswordForm />
      </Card>
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
    </Flex>
  );
};
