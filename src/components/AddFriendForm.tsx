import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { config, SPACING_BUTTONS, SPACING_INPUTS } from "../config";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: config.validation.email,
});

export const AddFriendForm: React.FC = () => {
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(_values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false);
            // history.push(config.routes.lists);
            alert("friendo will be added heres");
          }, 1000);
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
                  <Input {...field} type="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={SPACING_BUTTONS - 4}
              colorScheme="yellow"
              variant="outline"
              isFullWidth
              type="submit"
              isLoading={props.isSubmitting}
            >
              Invite my buddy 🤩
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
