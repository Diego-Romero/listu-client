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
import { useHistory } from "react-router";
import * as Yup from "yup";
import {
  config,
  REQUIRED_FIELD_ERROR,
  SPACING_BUTTONS,
  SPACING_INPUTS,
} from "../config";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: config.validation.email,
  password: Yup.string().required(REQUIRED_FIELD_ERROR),
});

export const LoginForm: React.FC = () => {
  const history = useHistory();
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(_values, actions) => {
          // todo: add login here
          setTimeout(() => {
            actions.setSubmitting(false);
            history.push(config.routes.lists);
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
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  id="password"
                  mt={SPACING_INPUTS}
                  isRequired
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input {...field} type="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={SPACING_BUTTONS}
              colorScheme="yellow"
              variant="outline"
              isFullWidth
              type="submit"
              isLoading={props.isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
