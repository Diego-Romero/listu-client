import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/undraw_team_collaboration_8eoc.svg";
import * as Yup from "yup";
import { config, SPACING_BUTTONS, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { useHistory } from "react-router";

const initialValues = {
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

  // const callSecureApi = async (body) => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     const url = `${config.env.serverUrl}/lists`;
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(body),
  //     });
  //     const data = await response.json();
  //     console.log("data", data);
  //     history.push(config.routes.lists);
  //   } catch (error) {
  //     console.log("error fetching from the api", error);
  //     toast({
  //       title: "Sorry!",
  //       description: "Something has gone wrong",
  //       status: "error",
  //       duration: 6000,
  //       isClosable: true,
  //     });
  //     history.push(config.routes.home);
  //   }
  // };

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card maxW={"500px"}>
        <Heading mt={2} size="lg">
          You are on the way!
        </Heading>

        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            setTimeout(async () => {
              actions.setSubmitting(false);
              toast({
                title: "Whoop 🙌",
                description: "Your new list is ready to go!",
                status: "success",
                duration: 6000,
                isClosable: true,
              });
              // await callSecureApi(values);
              // todo: add create list endpoint here
            }, 1000);
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
                    <Input {...field} type="text" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    <FormHelperText>
                      Please just give the list name such as house stuff,
                      grocery list, plans to conquer to world etc...
                    </FormHelperText>
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
                    <FormHelperText>
                      How would you conquer the world then? Let your friends
                      know what your list is about!
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
                Boom!
              </Button>
              <Button
                mt={3}
                variant="outline"
                isFullWidth
                isLoading={props.isSubmitting}
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
