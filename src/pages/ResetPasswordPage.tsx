import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Image, Input, InputGroup, InputRightElement, useMediaQuery, useToast } from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/team_up.svg";
import * as Yup from "yup";
import { config, PASSWORD_MIN_LENGTH, SPACING_BUTTONS, SPACING_INPUTS } from "../config";
import { useHistory, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { resetPasswordRequest } from "../api/requests";
import { createToast } from "../utils/utils";

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

export const ResetPasswordPage = () => {
  const history = useHistory();
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const { token } = useParams<ParamTypes>();

  async function resetPassword(values: ResetPasswordFormTypes, actions) {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }
  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card loading={loading}>
        <Heading size="lg" textAlign="center" mb={2}>
          Reset password
        </Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={resetPassword}
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
      </Card>
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
    </Flex>
  );
};
