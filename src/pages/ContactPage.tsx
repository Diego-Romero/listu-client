import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/contact.svg";
import * as Yup from "yup";
import { config, SPACING_BUTTONS, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { useHistory } from "react-router";
import { createToast } from "../utils/utils";
import { sendContactMessageRequest } from "../api/requests";

export interface ContactFormValues {
  message: string;
  email: string;
}

const initialValues: ContactFormValues = {
  message: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  email: config.validation.email,
  description: config.validation.description,
});

export const ContactPage = () => {
  const history = useHistory();
  const toast = useToast();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  async function submitMessage(values: ContactFormValues) {
    try {
      await sendContactMessageRequest(values);
      toast(
        createToast(
          "Whoop 🙌",
          "success",
          "Thank you for submitting your message, I will try to get back to you as soon as possible."
        )
      );
      history.push(config.routes.home);
    } catch (_err) {
      toast(
        createToast(
          "Yikes..",
          "error",
          "There has been an error submitting your message please try again later."
        )
      );
    }
  }

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card>
        <Heading mt={2} size="lg" textAlign="center" mb={4}>
          Contact
        </Heading>
        <Text fontSize="sm" color='gray'>Thank you so much for taking the time to reach me, I would love to hear any feedback from you that could help me improve this platform.</Text>

        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            submitMessage(values);
          }}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    id="email"
                    isRequired
                    mt={SPACING_INPUTS}
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="name">Email</FormLabel>
                    <Input {...field} type="email" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="message">
                {({ field, form }) => (
                  <FormControl
                    id="message"
                    isRequired
                    mt={SPACING_INPUTS}
                    isInvalid={form.errors.message && form.touched.message}
                  >
                    <FormLabel htmlFor="description">Message</FormLabel>
                    <Textarea size="sm" {...field} />
                    <FormErrorMessage>
                      {form.errors.description}
                    </FormErrorMessage>
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
                Send
              </Button>
              <Button
                mt={SPACING_BUTTONS - 4}
                colorScheme="teal"
                isFullWidth
                isLoading={props.isSubmitting}
                onClick={() => history.push(config.routes.home)}
              >
                Go to home
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
    </Flex>
  );
};
