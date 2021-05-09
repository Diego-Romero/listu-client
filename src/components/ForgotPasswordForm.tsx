import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { forgotPasswordRequest } from "../api/requests";
import { config, SPACING_BUTTONS, SPACING_INPUTS } from "../config";
import { createToast } from "../utils/utils";

export interface ForgotPasswordValues {
  email: string;
}

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: config.validation.email,
});

export const ForgotPasswordForm: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  async function resetPassword(values: ForgotPasswordValues, actions) {
    actions.setSubmitting(false);
    try {
      const res = await forgotPasswordRequest(values);
      console.log(res);
      toast(
        createToast(
          "Done!",
          "success",
          "Please review your emails to reset your password"
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
        onSubmit={resetPassword}
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
            <Button
              mt={SPACING_BUTTONS - 4}
              variant="solid"
              colorScheme="teal"
              isFullWidth
              isLoading={props.isSubmitting}
              onClick={() => history.push(config.routes.login)}
            >
              Go Back
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
