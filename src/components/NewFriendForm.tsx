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
  useToast,
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
import { registerFriendRequest } from "../api/requests";
import { toastConfig } from "../utils/utils";
import { useAuthenticatedContext } from "../context/AuthenticatedContext";
import { useParams } from "react-router-dom";

export interface RegisterFriendFormTypes {
  password: string;
  name: string;
}

const initialValues: RegisterFriendFormTypes = {
  password: "",
  name: "",
};

const validationSchema = Yup.object().shape({
  password: config.validation.password,
  name: config.validation.name,
});

interface ParamTypes {
  id: string;
}

export const NewFriendForm: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const { id } = useParams<ParamTypes>();
  const [show, setShow] = React.useState(false);
  const { login } = useAuthenticatedContext();

  async function registerFriend(values: RegisterFriendFormTypes, actions) {
    actions.setSubmitting(false);
    try {
      const res = await registerFriendRequest(values, id);
      login(res.data);
      toast(toastConfig("Whoop 🙌, you can now login!", "success"));
      history.push(config.routes.login);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        toastConfig("Yikes... There has been an error", "error", errorMessage)
      );
    }
  }

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={registerFriend}
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
