import {
  Box,
  Button,
  Divider,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { config, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { addFriendRequest } from "../api/requests";
import { toastConfig } from "../utils/utils";
import { List, User } from "../type";

export interface AddFriendFormValues {
  email: string;
}

const initialValues: AddFriendFormValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: config.validation.email,
});
interface Props {
  modalOpen: boolean;
  modalClose: () => void;
  list: List;
}

export const InviteFriendModal: React.FC<Props> = ({
  modalOpen,
  modalClose,
  list,
}) => {
  const toast = useToast();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const [loading, setLoading] = React.useState(false);

  const addFriend = async (values: AddFriendFormValues, resetForm: any) => {
    setLoading(true);
    try {
      const res = await addFriendRequest(values, list._id);
      toast(toastConfig(res.data.message, "info"));
      resetForm();
      list.users.push(res.data.user as User);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        toastConfig("Yikes... There has been an error", "error", errorMessage)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={modalOpen} onClose={modalClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite a friend</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              addFriend(values, actions.resetForm);
            }}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      id="email"
                      mt={SPACING_INPUTS}
                      isRequired
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Input
                        {...field}
                        type="email"
                        autoFocus={isLargerThan480}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  mb={6}
                  colorScheme="teal"
                  variant="outline"
                  isFullWidth
                  type="submit"
                  isLoading={props.isSubmitting || loading}
                >
                  Invite friend
                </Button>
              </Form>
            )}
          </Formik>
          <Divider />
          <Box mt={8} mb={4}>
            <Box mb={4}>
              <Heading size="sm">List created by </Heading>
              <Text mt={2}>
                {list.createdBy.name} - {list.createdBy.email}
              </Text>
            </Box>
            <Heading size="sm">Current people in this list</Heading>
            <UnorderedList mt={2}>
              {list?.users.map((user) => (
                <ListItem key={user._id}>{user.email}</ListItem>
              ))}
            </UnorderedList>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
