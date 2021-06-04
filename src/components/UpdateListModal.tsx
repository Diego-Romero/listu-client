import {
  AlertDialog,
  Text,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useMediaQuery,
  UnorderedList,
  ListItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { config, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { List, User } from "../type";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AddFriendForm } from "./AddFriendForm";

export interface CreateListValues {
  name: string;
  description: string;
}

const validationSchema = Yup.object().shape({
  name: config.validation.name,
  description: config.validation.description,
});

interface Props {
  modalOpen: boolean;
  modalClose: () => void;
  list: List;
  user: User;
  updateList: (listId: string, values: CreateListValues) => void;
  deleteList: (listId: string) => void;
}

export const UpdateListModal: React.FC<Props> = ({
  modalOpen,
  modalClose,
  list,
  user,
  updateList,
  deleteList,
}) => {
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const alertDialogCancelRef = React.useRef();
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();

  const initialValues: CreateListValues = {
    name: list.name,
    description: list.description as string,
  };

  return (
    <Modal isOpen={modalOpen} onClose={modalClose} size={"md"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              updateList(list._id, values);
              modalClose();
            }}
            validationSchema={validationSchema}
          >
            {() => (
              <Form>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      id="name"
                      isRequired
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input
                        {...field}
                        type="text"
                        autoFocus={isLargerThan480}
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description">
                  {({ field, form }) => (
                    <FormControl
                      id="description"
                      mt={SPACING_INPUTS}
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                    >
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <Textarea size="sm" {...field} rows={6} />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="teal"
                  variant="solid"
                  isFullWidth
                  type="submit"
                >
                  Update
                </Button>
                <Button
                  mt={4}
                  mb={4}
                  colorScheme="gray"
                  variant="outline"
                  isFullWidth
                  onClick={() => modalClose()}
                >
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
          <Divider />
          <Box mt={4} mb={4}>
            <Heading mb={4} size="md">
              Users
            </Heading>
            <Box>
              {list.createdBy.email ? (
                <Box>
                  <Text mt={2}>
                    List created by:{" "}
                    <i>
                      {list.createdBy.name} - {list.createdBy.email}
                    </i>
                  </Text>
                </Box>
              ) : null}
            </Box>
            {list.users.length > 1 ? (
              <Box mt={4}>
                <Heading size="sm">Current people in this list</Heading>
                <UnorderedList mt={2}>
                  {list.users.map((user) => (
                    <ListItem key={user._id}>{user.email}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            ) : null}
            <Popover isLazy placement="auto">
              <PopoverTrigger>
                <Button
                  rightIcon={<AiOutlineUserAdd />}
                  colorScheme="teal"
                  mt={4}
                  isFullWidth
                  variant="outline"
                >
                  Add Friend
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Add Friend</PopoverHeader>
                <PopoverBody>
                  <AddFriendForm list={list} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          {list.createdBy._id === user._id ? (
            <Box>
              <Divider />
              <Heading mt={4} mb={2} size="md">
                Danger Zone
              </Heading>
              <Text fontSize="sm">
                List can only be deleted by the person who created it
              </Text>
              <Button
                mt={4}
                mb={4}
                colorScheme="red"
                variant="outline"
                isFullWidth
                onClick={onDeleteAlertOpen}
              >
                Delete List
              </Button>
            </Box>
          ) : null}
        </ModalBody>
      </ModalContent>
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={alertDialogCancelRef}
        onClose={onDeleteAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete list
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can not undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={alertDialogCancelRef} onClick={onDeleteAlertClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteList(list._id);
                  onDeleteAlertClose();
                  modalClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Modal>
  );
};
