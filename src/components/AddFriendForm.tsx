import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { addFriendRequest } from "../api/requests";
import { config, SPACING_BUTTONS, SPACING_INPUTS } from "../config";
import { createToast } from "../utils/utils";

export interface AddFriendFormValues {
  email: string;
}

const initialValues: AddFriendFormValues = {
  email: "",
};

interface ParamTypes {
  id: string;
}

const validationSchema = Yup.object().shape({
  email: config.validation.email,
});

interface Props {
  refreshList: () => void
}

export const AddFriendForm: React.FC<Props> = ({ refreshList }) => {
  const [loading, setLoading] = React.useState(false)
  const { id } = useParams<ParamTypes>();
  const toast = useToast();

  const addFriend = async (values: AddFriendFormValues, resetForm: any) => {
    setLoading(true)
    try {
      const res = await addFriendRequest(values, id);
      toast(
        createToast(
          res.data.message,
          "success"
        )
        );
        resetForm()
        refreshList()
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        createToast("Yikes... There has been an error", "error", errorMessage)
      );
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          addFriend(values, actions.resetForm);
        }}
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
                  <Input {...field} type="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={SPACING_BUTTONS - 4}
              colorScheme="yellow"
              variant="outline"
              isFullWidth
              type="submit"
              isLoading={props.isSubmitting || loading}
            >
              Invite my buddy 🤩
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
