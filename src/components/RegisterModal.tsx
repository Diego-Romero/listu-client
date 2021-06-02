import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { RegisterForm } from "./RegisterForm";

interface Props {
  modalOpen: boolean;
  modalClose: () => void;
}

export const RegisterModal: React.FC<Props> = ({ modalOpen, modalClose }) => {
  return (
    <Modal isOpen={modalOpen} onClose={modalClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
