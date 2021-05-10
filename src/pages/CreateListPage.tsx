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
import logo from "../images/icons/landing.svg";
import * as Yup from "yup";
import { config, SPACING_BUTTONS, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { useHistory } from "react-router";
import { createListRequest } from "../api/requests";
import { createToast } from "../utils/utils";
import ReactGA from 'react-ga';

export interface CreateListValues {
  name: string;
  description: string;
}

const initialValues: CreateListValues = {
  name: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  name: config.validation.name,
  description: config.validation.description,
});

export const CreateListPage = () => {
  const history = useHistory();
  const toast = useToast();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  async function createList(values: CreateListValues) {
    try {
      await createListRequest(values);
      ReactGA.event({
        category: config.googleAnalytics.lists,
        action: 'list created'
      })
      toast(
        createToast("Whoop 🙌", "success", "Your new list is ready to go.")
      );
      history.push(config.routes.lists);
    } catch (_err) {
      toast(
        createToast(
          "Yikes..",
          "error",
          "There has been an error creating your list, please try again later."
        )
      );
    }
  }

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card>
        <Heading mt={2} size="lg" textAlign="center" mb={4}>
          Create a list
        </Heading>

        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            createList(values);
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
              <Field name="description">
                {({ field, form }) => (
                  <FormControl
                    id="description"
                    mt={SPACING_INPUTS}
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
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
                Create
              </Button>
              <Button
                mt={4}
                isFullWidth
                colorScheme="teal"
                variant="solid"
                onClick={() => history.push(config.routes.lists)}
              >
                Back
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
    </Flex>
  );
};
