import {
  Button,
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
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { config, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { createListRequest } from "../api/requests";
import { toastConfig } from "../utils/utils";
import ReactGA from "react-ga";
import { useUiContext } from "../context/UiContext";
import { List } from "../type";

export interface CreateListValues {
  name: string;
  description: string;
}

const initialValues: CreateListValues = {
  name: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  name: config.validation.name,
  description: config.validation.description,
});

interface Props {
  modalOpen: boolean;
  modalClose: () => void;
  lists: List[];
}

export const CreateListModal: React.FC<Props> = ({modalOpen, modalClose, lists}) => {
  const toast = useToast();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const { setLoading } = useUiContext();

  async function createList(values: CreateListValues) {
    setLoading(true)
    try {
      const res = await createListRequest(values);
      console.log(res, res.data)
      ReactGA.event({
        category: config.googleAnalytics.lists,
        action: "list created",
      });
      toast(
        toastConfig("Whoop 🙌", "info", "Your new list is ready to go.")
      );
      lists.push(res.data as List)
      modalClose();
    } catch (_err) {
      toast(
        toastConfig(
          "Yikes..",
          "error",
          "There has been an error creating your list, please try again later."
        )
      );
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={modalOpen} onClose={modalClose} size="sm" >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              createList(values);
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
                  isLoading={props.isSubmitting}
                >
                  Create
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
