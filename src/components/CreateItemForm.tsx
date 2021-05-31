import {
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { config, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { List } from "../type";
import { AddIcon } from "@chakra-ui/icons";

export interface CreateListItemValues {
  name: string;
}

const initialValues: CreateListItemValues = {
  name: "",
};

const validationSchema = Yup.object().shape({
  name: config.validation.name,
});

interface Props {
  createNewItem: (listId: string, itemValues: CreateListItemValues) => void;
  list: List;
}

export const CreateListItemForm: React.FC<Props> = ({
  createNewItem,
  list,
}) => {
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values: CreateListItemValues, actions) => {
        actions.setSubmitting(false);
        createNewItem(list._id, values);
        actions.resetForm();
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <Field name="name">
            {({ field, form }) => (
              <FormControl
                id="name"
                mt={SPACING_INPUTS}
                isRequired
                isInvalid={form.errors.name && form.touched.name}
              >
                <InputGroup size="md">
                  <Input
                    autoFocus={isLargerThan480} // only autofocus on non mobile views
                    type="text"
                    placeholder="Add a new list item"
                    variant="flushed"
                    {...field}
                  />
                  <InputRightElement width="3.2rem">
                    <IconButton
                      variant="solid"
                      colorScheme="teal"
                      size="sm"
                      isRound
                      mb={2}
                      type="submit"
                      aria-label="Delete item"
                      icon={<AddIcon />}
                    />
                    {/* <Button
                      h="1.5rem"
                      size="sm"
                      type="submit"
                      variant="outline"
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                    >
                      Add
                    </Button> */}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};
