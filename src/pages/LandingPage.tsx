import {
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import { ForgotPasswordModal } from "../components/ForgotPasswordModal";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";
import { config } from "../config";
import logo from "../images/icons/landing-teal.svg";

export const Landing: React.FC = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterModalOpen,
    onOpen: onRegisterModalOpen,
    onClose: onRegisterModalClose,
  } = useDisclosure();
  const {
    isOpen: isForgotPasswordOpen,
    onOpen: onForgotPasswordOpen,
    onClose: onForgotPasswordClose,
  } = useDisclosure();

  React.useEffect(() => {
    if (token) history.push(config.routes.lists);
  }, []);

  return (
    <VStack spacing={6} mt={8} textAlign="center">
      <Heading
        as="h1"
        size="2xl"
        bgClip="text"
        bgGradient="linear(to-r, teal.500,green.500)"
      >
        Listu
      </Heading>
      <Text fontSize="lg">Minimalist app for you and your friends.</Text>
      {!token ? (
        <Stack spacing={0}>
          <Button
            variant="outline"
            colorScheme="teal"
            color="white"
            bgGradient="linear(to-r, teal.500,green.500)"
            _hover={{
              bgGradient: "linear(to-r, teal.400, green.400)",
            }}
            size="md"
            mb={4}
            onClick={onLoginModalOpen}
          >
            Login
          </Button>
          <Button
            variant="outline"
            colorScheme="teal"
            color="white"
            bgGradient="linear(to-r, teal.500,green.500)"
            _hover={{
              bgGradient: "linear(to-r, teal.400, green.400)",
            }}
            size="md"
            mb={4}
            onClick={onRegisterModalOpen}
          >
            Register
          </Button>
        </Stack>
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
      <Image mt={2} boxSize={["300px", "450px"]} src={logo} alt="Login" />
      <LoginModal modalOpen={isLoginModalOpen} modalClose={onLoginModalClose} openForgotPasswordModal={onForgotPasswordOpen} />
      <RegisterModal
        modalOpen={isRegisterModalOpen}
        modalClose={onRegisterModalClose}
      />
      <ForgotPasswordModal
        modalOpen={isForgotPasswordOpen}
        modalClose={onForgotPasswordClose}
      />
    </VStack>
  );
};
