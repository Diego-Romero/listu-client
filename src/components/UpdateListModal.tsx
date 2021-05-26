import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { config, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { createListRequest, deleteListRequest } from "../api/requests";
import { toastConfig } from "../utils/utils";
import ReactGA from "react-ga";
import { List } from "../type";
import { useHistory } from "react-router-dom";

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
}

export const UpdateListModal: React.FC<Props> = ({
  modalOpen,
  modalClose,
  list,
}) => {
  const toast = useToast();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const alertDialogCancelRef = React.useRef();
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();
  const history = useHistory();

  const initialValues: CreateListValues = {
    name: list.name,
    description: list.description as string,
  };

  async function updateList(values: CreateListValues, actions) {
    try {
      await createListRequest(values);
      ReactGA.event({
        category: config.googleAnalytics.lists,
        action: "list created",
      });
      toast(
        toastConfig("Whoop 🙌", "success", "Your new list is ready to go.")
      );
    } catch (_err) {
      toast(
        toastConfig(
          "Yikes..",
          "error",
          "There has been an error creating your list, please try again later."
        )
      );
    } finally {
      actions.setSubmitting(false);
    }
  }

  const handleListDelete = async () => {
    const declaredList = list as List;
    try {
      await deleteListRequest(declaredList._id);
      toast(toastConfig("List has been deleted successfully", "info"));
      history.push(config.routes.lists);
    } catch (error) {
      const errorMessage = error.response.data.message;
      toast(
        toastConfig(
          "Whoops, there has been an error deleting the list.",
          "warning",
          errorMessage
        )
      );
    } 
  };

  return (
    <Modal isOpen={modalOpen} onClose={modalClose} size="lg">
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
              updateList(values, actions);
            }}
            validationSchema={validationSchema}
          >
            {(props) => (
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
                      <Textarea size="sm" {...field} />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="green"
                  variant="solid"
                  isFullWidth
                  type="submit"
                  isLoading={props.isSubmitting}
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
              <Button
                ref={alertDialogCancelRef}
                onClick={onDeleteAlertClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleListDelete()}
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
