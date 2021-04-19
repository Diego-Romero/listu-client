import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  config,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  SPACING_BUTTONS,
  SPACING_INPUTS,
} from "../config";
import { useHistory } from "react-router";

const initialValues = {
  email: "",
  password: "",
  name: "",
};

const validationSchema = Yup.object().shape({
  email: config.validation.email,
  password: config.validation.password,
  name: config.validation.name,
});

export const RegisterForm: React.FC = () => {
  const history = useHistory();
  const [show, setShow] = React.useState(false);
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false);
            history.push(config.routes.createList);
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
                  <Input {...field} type="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  <FormHelperText>
                    Must be longer than {NAME_MIN_LENGTH} characters.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
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
                  <FormHelperText>
                    We will never share your email.
                  </FormHelperText>
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
                  <InputGroup>
                    <Input
                      {...field}
                      type={show ? "text" : "password"}
                      pr="4.5rem"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShow(!show)}
                      >
                        {show ? "hide" : "show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  <FormHelperText>
                    Must be longer than {PASSWORD_MIN_LENGTH} characters.
                  </FormHelperText>
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
