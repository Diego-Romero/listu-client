import {
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { config, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { List } from "../type";
import { AddIcon } from "@chakra-ui/icons";
import MouseTrap from "mousetrap";

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
  const inputEl = React.useRef(null);

  React.useEffect(() => {
    MouseTrap.bind("space", () => inputEl.current.focus());
  }, []);
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values: CreateListItemValues, actions) => {
        actions.setSubmitting(false);
        createNewItem(list._id, values);
        actions.resetForm();
        inputEl.current.blur();
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
                    // autoFocus={isLargerThan480} // only autofocus on non mobile views
                    type="text"
                    placeholder="Add a new list item"
                    variant="flushed"
                    ref={inputEl}
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
                      aria-label="Create item"
                      icon={<AddIcon />}
                    />
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
