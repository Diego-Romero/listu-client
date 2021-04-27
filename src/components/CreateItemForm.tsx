import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { config, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";

export interface CreateListItemValues {
  name: string;
  description?: string;
}

const initialValues: CreateListItemValues = {
  name: "",
  // description: "",
};

const validationSchema = Yup.object().shape({
  name: config.validation.name,
  // description: config.validation.description,
});

interface Props {
  createNewItem: (body: CreateListItemValues) => Promise<void>;
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
                {/* <Input {...field} type="text" /> */}
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type="text"
                    placeholder="Item name"
                    {...field}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      type="submit"
                      isLoading={props.isSubmitting}
                    >
                      Add
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          {/* <Field name="description">
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
          </Field>*/}
          {/* <Button
            mt={4}
            colorScheme="yellow"
            variant="outline"
            isFullWidth
            type="submit"
            isLoading={props.isSubmitting}
          >
            Create
          </Button> */}
        </Form>
      )}
    </Formik>
  );
};
