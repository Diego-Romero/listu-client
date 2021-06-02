import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

interface Props {
  modalOpen: boolean;
  modalClose: () => void;
}

export const ForgotPasswordModal: React.FC<Props> = ({ modalOpen, modalClose }) => {
  return (
    <Modal isOpen={modalOpen} onClose={modalClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Forgot Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ForgotPasswordForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
