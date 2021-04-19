import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { config, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";

const initialValues = {
  name: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  name: config.validation.name,
  description: config.validation.description,
});

interface Props {
  createNewItem: (body) => Promise<void>;
}

export const CreateListItemForm: React.FC<Props> = ({ createNewItem }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
          createNewItem(values);
        }, 1000);
      }}
      validationSchema={validationSchema}
    >
      {(props) => (
        <Form>
          <Field name="name">
            {({ field, form }) => (
              <FormControl
                id="name"
                mt={SPACING_INPUTS}
                isRequired
                isInvalid={form.errors.name && form.touched.name}
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} type="text" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="description">
            {({ field, form }) => (
              <FormControl
                id="description"
                mt={SPACING_INPUTS}
                isInvalid={form.errors.description && form.touched.description}
              >
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea size="sm" {...field} />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="yellow"
            variant="outline"
            isFullWidth
            type="submit"
            isLoading={props.isSubmitting}
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};
