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
  createNewItem: (body: CreateListItemValues) => void;
}

export const CreateListItemForm: React.FC<Props> = ({ createNewItem }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        createNewItem(values);
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
        </Form>
      )}
    </Formik>
  );
};
