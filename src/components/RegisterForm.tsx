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
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  config,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  SPACING_INPUTS,
} from "../config";
import { useHistory } from "react-router";
import { registerRequest } from "../api/requests";
import { toastConfig } from "../utils/utils";
import ReactGA from "react-ga";
import { useUserContext } from "../context/UserContext";

export interface RegisterFormTypes {
  email: string;
  password: string;
  name: string;
}

const initialValues: RegisterFormTypes = {
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
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const { setUser } = useUserContext();
  const history = useHistory();

  async function register(values: RegisterFormTypes, actions) {
    try {
      const res = await registerRequest(values);
      ReactGA.event({
        category: config.googleAnalytics.users,
        action: "user created",
      });
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
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={register}
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
                  <Input {...field} type="name" autoFocus={isLargerThan480} />
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
              mt={6}
              mb={6}
              colorScheme="teal"
              variant="solid"
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
