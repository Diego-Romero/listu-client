/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Image,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { getListItemRequest, updateListItemRequest } from "../api/requests";
import { Card } from "../components/Card";
import logo from "../images/icons/landing2.svg";
import { ListItem } from "../type";
import { createToast, formatDate } from "../utils/utils";
import * as Yup from "yup";
import { config, SPACING_BUTTONS, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";

export interface UpdateListItemValues {
  name: string;
  description?: string;
  done: boolean;
}

const initialValues: UpdateListItemValues = {
  name: "",
  description: "",
  done: false,
};

const validationSchema = Yup.object().shape({
  name: config.validation.name,
  description: config.validation.description,
});

interface ParamTypes {
  listId: string;
  listItemId: string;
}

export const ListItemPage = () => {
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const { listItemId, listId } = useParams<ParamTypes>();
  const [listItem, setListItem] = React.useState<ListItem | null>(null);
  const toast = useToast();

  React.useEffect(() => {
    getListItem();
  }, []);

  async function getListItem() {
    console.log(listId, listItemId);
    setLoading(true);
    try {
      const res = await getListItemRequest(listItemId);
      setListItem(res.data);
      initialValues.name = res.data.name;
      initialValues.description = res.data.description;
      initialValues.done = res.data.done;
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        createToast(
          "Whoops, there has been an error retrieving this list item",
          "error",
          errorMessage
        )
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateListItem(values: UpdateListItemValues) {
    setLoading(true)
    const updated = {...listItem} as ListItem;
    updated.name = values.name;
    updated.description = values.description;
    updated.done = values.done;
    console.log(updated)
    try {
      await updateListItemRequest(listId, listItemId, updated);
      history.push(config.routes.singleListUrl(listId))
      toast(createToast("Item updated", "success"));
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        createToast(
          "whoops, there has been an error deleting the item",
          "error",
          errorMessage
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card loading={loading}>
        {listItem === null ? null : (
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              console.log(values);
              updateListItem(values)
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
                <Field name="done">
                  {({ field, form }) => (
                    <FormControl
                      id="done"
                      mt={SPACING_INPUTS}
                      isInvalid={form.errors.done && form.touched.done}
                    >
                      <Checkbox size="md" colorScheme="green" {...field}>
                        Done
                      </Checkbox>
                      <FormErrorMessage>{form.errors.done}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Stack mt={4}>
                  <Text fontSize="sm" color="gray">
                    Created: {formatDate(listItem!.createdAt)}
                  </Text>
                  <Text fontSize="sm" color="gray">
                    Created by: {listItem!.createdBy.name}
                  </Text>
                </Stack>
                <Button
                  mt={SPACING_BUTTONS}
                  colorScheme="teal"
                  variant="outline"
                  isFullWidth
                  type="submit"
                  isLoading={props.isSubmitting}
                >
                  Update
                </Button>
                <Button
                  mt={3}
                  variant="outline"
                  isFullWidth
                  isLoading={props.isSubmitting}
                  onClick={() =>
                    history.push(config.routes.singleListUrl(listId))
                  }
                >
                  Back
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </Card>
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
    </Flex>
  );
};
