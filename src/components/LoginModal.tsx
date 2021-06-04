import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  Center,
} from "@chakra-ui/react";
import React from "react";
import logo from "../images/icons/landing2.svg";
import { LoginForm } from "./LoginForm";

interface Props {
  modalOpen: boolean;
  modalClose: () => void;
  openForgotPasswordModal: () => void;
}

export const LoginModal: React.FC<Props> = ({
  modalOpen,
  modalClose,
  openForgotPasswordModal,
}) => {
  return (
    <Modal isOpen={modalOpen} onClose={modalClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LoginForm
            openForgotPasswordModal={openForgotPasswordModal}
            modalClose={modalClose}
          />
        </ModalBody>
        <Center>
          <Image boxSize={["200px"]} src={logo} alt="Login" />
        </Center>
      </ModalContent>
    </Modal>
  );
};
