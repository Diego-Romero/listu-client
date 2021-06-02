import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Input,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { forgotPasswordRequest } from "../api/requests";
import { config, SPACING_INPUTS } from "../config";
import { toastConfig } from "../utils/utils";

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
  const toast = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  async function resetPassword(values: ForgotPasswordValues, actions) {
    try {
      await forgotPasswordRequest(values);
      setSubmitted(true);
      toast(
        toastConfig(
          "Done!",
          "info",
          "Please review your email to reset your password"
        )
      );
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
      {submitted ? (
        <Text fontSize="lg" mb={6}>
          Please check your email to reset your password.
        </Text>
      ) : (
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
                    <FormLabel htmlFor="email">
                      What is your email address?
                    </FormLabel>
                    <Input
                      {...field}
                      type="email"
                      autoFocus={isLargerThan480}
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                mb={4}
                colorScheme="teal"
                variant="solid"
                isFullWidth
                type="submit"
                isLoading={props.isSubmitting}
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};
