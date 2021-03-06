import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  useToast,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { loginRequest } from "../api/requests";
import { config, REQUIRED_FIELD_ERROR, SPACING_INPUTS } from "../config";
import { useUserContext } from "../context/UserContext";
import { toastConfig } from "../utils/utils";

export interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: config.validation.email,
  password: Yup.string().required(REQUIRED_FIELD_ERROR),
});

interface Props {
  modalClose: () => void;
  openForgotPasswordModal: () => void;
}

export const LoginForm: React.FC<Props> = ({
  openForgotPasswordModal,
  modalClose,
}) => {
  const history = useHistory();
  const toast = useToast();
  const { setUser } = useUserContext();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  async function loginUser(values: LoginFormValues, actions) {
    try {
      const res = await loginRequest(values);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      history.push(config.routes.lists);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        toastConfig("Yikes... There has been an error", "error", errorMessage)
      );
    } finally {
      actions.setSubmitting(false);
    }
  }

  function handleForgotPassword() {
    modalClose();
    openForgotPasswordModal();
  }

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={loginUser}
        validateOnChange={false}
        validateOnBlur={false}
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
                  <Input {...field} type="email" autoFocus={isLargerThan480} />
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

            <Text mt={4}>
              <Link color="gray.400" onClick={() => handleForgotPassword()}>
                Forgot password?
              </Link>
            </Text>
            <Button
              mt={6}
              mb={6}
              colorScheme="teal"
              variant="solid"
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
