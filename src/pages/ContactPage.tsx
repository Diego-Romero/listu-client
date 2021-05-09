import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
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

export interface ContactFormValues {
  name: string;
  message: string;
  email: string;
}

const initialValues: ContactFormValues = {
  name: "",
  message: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  name: config.validation.name,
  description: config.validation.description,
});

export const ContactPage = () => {
  const history = useHistory();
  const toast = useToast();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  async function submitMessage(values: ContactFormValues) {
    console.log(values);
    try {
      // todo: add request to server
      // await createListRequest(values);
      toast(
        createToast(
          "Whoop 🙌",
          "success",
          "Thank you for submitting your message, I will try to get back to you as soon as possible."
        )
      );
      history.push(config.routes.lists);
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
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    id="name"
                    mt={SPACING_INPUTS}
                    isRequired
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input {...field} type="text" autoFocus={isLargerThan480} />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    id="name"
                    mt={SPACING_INPUTS}
                    isInvalid={form.errors.name && form.touched.name}
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
