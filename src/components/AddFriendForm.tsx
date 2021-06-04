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
import * as Yup from "yup";
import { addFriendRequest } from "../api/requests";
import { config, SPACING_INPUTS } from "../config";
import { List, User } from "../type";
import { toastConfig } from "../utils/utils";
export interface AddFriendFormValues {
  email: string;
}

const addFriendInitialValues: AddFriendFormValues = {
  email: "",
};

const addFriendValidationSchema = Yup.object().shape({
  email: config.validation.email,
});
export interface CreateListValues {
  name: string;
  description: string;
}

interface Props {
  list: List;
}

export const AddFriendForm: React.FC<Props> = ({ list }) => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  const addFriend = async (values: AddFriendFormValues, resetForm: any) => {
    setLoading(true);
    try {
      const res = await addFriendRequest(values, list._id);
      console.log(res);
      toast(toastConfig(res.data.message, "info"));
      resetForm();
      list.users.push(res.data.user as User);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        toastConfig("Yikes... There has been an error", "error", errorMessage)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box >
      <Formik
        initialValues={addFriendInitialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          addFriend(values, actions.resetForm);
        }}
        validationSchema={addFriendValidationSchema}
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
                  <FormLabel fontSize="sm" htmlFor="email">Email Address</FormLabel>
                  <Input {...field} size="sm" type="email" autoFocus={isLargerThan480} />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              mb={4}
              colorScheme="teal"
              variant="solid"
              size="sm"
              isFullWidth
              type="submit"
              isLoading={props.isSubmitting || loading}
            >
              Invite friend
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
