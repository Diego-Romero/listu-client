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
  PASSWORD_MIN_LENGTH,
  SPACING_BUTTONS,
  SPACING_INPUTS,
} from "../config";
import { useHistory } from "react-router";
import { resetPasswordRequest } from "../api/requests";
import { createToast } from "../utils/utils";
import { useParams } from "react-router-dom";

export interface ResetPasswordFormTypes {
  password: string;
}

const initialValues: ResetPasswordFormTypes = {
  password: "",
};

const validationSchema = Yup.object().shape({
  password: config.validation.password,
});

interface ParamTypes {
  token: string;
}

export const ResetPasswordForm: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const { token } = useParams<ParamTypes>();
  async function register(values: ResetPasswordFormTypes, actions) {
    actions.setSubmitting(false);
    try {
      await resetPasswordRequest(values, token);
      toast(
        createToast(
          "Whoop 🙌",
          "success",
          "You can now log in with your new password"
        )
      );
      history.push(config.routes.login);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        createToast("Yikes... There has been an error", "error", errorMessage)
      );
    }
  }
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={register}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  id="password"
                  mt={SPACING_INPUTS}
                  isRequired
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">New Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      autoFocus={isLargerThan480}
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
              colorScheme="teal"
              variant="outline"
              isFullWidth
              type="submit"
              isLoading={props.isSubmitting}
            >
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
