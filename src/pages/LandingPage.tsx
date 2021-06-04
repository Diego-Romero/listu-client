import {
  VStack,
  Heading,
  Button,
  Image,
  Stack,
  useDisclosure,
  ListItem,
  List,
  ListIcon,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import { ForgotPasswordModal } from "../components/ForgotPasswordModal";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";
import { config } from "../config";
import logo from "../images/icons/landing-teal.svg";
import { MdAccessible } from "react-icons/md";
import { FaRegKeyboard, FaUserFriends } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";

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

      <List fontSize="lg">
        <ListItem>
          <ListIcon as={BsCardChecklist} color="teal.500" size="lg" />
          Dead simple todo list app
        </ListItem>
        <ListItem>
          <ListIcon as={FaUserFriends} color="teal.500" />
          Share lists with your friends
        </ListItem>
        <ListItem>
          <ListIcon as={FaRegKeyboard} color="teal.500" />
          Ultra keyboard enhanced for speed
        </ListItem>
        <ListItem>
          <ListIcon as={MdAccessible} color="teal.500" />
          Optimized for accessibility
        </ListItem>
      </List>
      {!token ? (
        <Stack spacing={0}>
          <Button
            variant="solid"
            colorScheme="teal"
            size="md"
            mb={4}
            onClick={onLoginModalOpen}
          >
            Login
          </Button>
          <Button
            variant="outline"
            colorScheme="teal"
            size="md"
            onClick={onRegisterModalOpen}
          >
            Register
          </Button>
        </Stack>
      ) : (
        <Button
          colorScheme="teal"
          size="lg"
          variant="outline"
          mb={4}
          onClick={() => history.push(config.routes.lists)}
        >
          Lists
        </Button>
      )}
      <Image boxSize={["300px", "450px"]} src={logo} alt="Login" />
      <LoginModal
        modalOpen={isLoginModalOpen}
        modalClose={onLoginModalClose}
        openForgotPasswordModal={onForgotPasswordOpen}
      />
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
