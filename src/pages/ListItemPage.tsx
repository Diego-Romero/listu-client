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
  useMediaQuery,
  Box,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  getListItemRequest,
  getSignedUrlRequest,
  putFileToS3,
  updateListItemRequest,
} from "../api/requests";
import { Card } from "../components/Card";
import logo from "../images/icons/landing2.svg";
import { ListItem } from "../type";
import { createToast, longDateFormat } from "../utils/utils";
import * as Yup from "yup";
import { config, SPACING_BUTTONS, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { AttachmentIcon, ExternalLinkIcon, InfoIcon } from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";

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
  const [loadingFileUpload, setLoadingFileUpload] = React.useState(false);
  const { listItemId, listId } = useParams<ParamTypes>();
  const [listItem, setListItem] = React.useState<ListItem | null>(null);
  const toast = useToast();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: "image/*",
    maxFiles: 1,
    maxSize: 5242880, // 5mb
  });

  React.useEffect(() => {
    getListItem();
  }, []);

  async function uploadFile() {
    setLoadingFileUpload(true);
    try {
      const file = acceptedFiles[0];
      const fileExtension = file.type.split("/")[1];
      const fileName = `${listItemId}.${fileExtension}`;
      const getSignedUrl = await getSignedUrlRequest(
        listId,
        listItemId,
        fileName
      );
      const url = getSignedUrl.data.url as string;
      await putFileToS3(file, url);
      getListItem();
    } catch (e) {
      if (e.response) {
        const errorMessage = e.response.data.message;
        toast(
          createToast("Yikes... There has been an error", "error", errorMessage)
        );
      } else {
        toast(
          createToast(
            "Yikes... There has been an error uploading your file",
            "error"
          )
        );
      }
    } finally {
      setLoadingFileUpload(false);
    }
  }

  React.useEffect(() => {
    if (acceptedFiles.length === 1) {
      uploadFile();
    }
  }, [acceptedFiles]);

  async function getListItem() {
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
    setLoading(true);
    const updated = { ...listItem } as ListItem;
    updated.name = values.name;
    updated.description = values.description;
    updated.done = values.done;
    try {
      await updateListItemRequest(listId, listItemId, updated);
      history.push(config.routes.singleListUrl(listId));
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
              updateListItem(values);
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
                      <Input
                        {...field}
                        type="text"
                        autoFocus={isLargerThan480}
                      />
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
                      <Checkbox size="lg" colorScheme="teal" {...field}>
                        Mark as done
                      </Checkbox>
                      <FormErrorMessage>{form.errors.done}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {listItem.attachmentUrl ? (
                  <Box>
                    <Button
                      rightIcon={<ExternalLinkIcon />}
                      colorScheme="teal"
                      mt={4}
                      variant="outline"
                      as="a"
                      isFullWidth={false}
                      href={listItem.attachmentUrl}
                    >
                      Download image
                    </Button>
                  </Box>
                ) : null}
                <Box>
                <HStack mt={4}>
                  <InfoIcon h={4} w={4} color="gray" />
                  <Text fontSize="sm" color="gray">
                    You are only able to upload images smaller than 5mb
                  </Text>
                </HStack>
                  <Button
                    rightIcon={<AttachmentIcon />}
                    colorScheme="gray"
                    mt={4}
                    isFullWidth={false}
                    variant="solid"
                    isLoading={loadingFileUpload}
                    loadingText="Uploading.."
                    onClick={open}
                  >
                    {listItem.attachmentUrl
                      ? `Update image`
                      : "Attach an image"}
                  </Button>
                </Box>
                <Box {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                </Box>
                <Stack mt={4}>
                  <Text fontSize="sm" color="gray">
                    Created by <b>{listItem!.createdBy.name}</b> on the {longDateFormat(listItem!.createdAt)}
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
                  mt={4}
                  isFullWidth
                  colorScheme="teal"
                  variant="solid"
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
