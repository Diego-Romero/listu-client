import {
  Text,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { config, SPACING_BUTTONS, SPACING_INPUTS } from "../config";
import { Field, Form, Formik } from "formik";
import { longDateFormat, toastConfig } from "../utils/utils";
import { ListItemType } from "../type";
import { useDropzone } from "react-dropzone";
import { getSignedUrlRequest, putFileToS3 } from "../api/requests";
import { AttachmentIcon, ExternalLinkIcon, InfoIcon } from "@chakra-ui/icons";

export interface UpdateListItemValues {
  name: string;
  description?: string;
  // done: boolean;
}

const validationSchema = Yup.object().shape({
  name: config.validation.name,
  description: config.validation.description,
});

interface Props {
  modalOpen: boolean;
  modalClose: () => void;
  listItem: ListItemType;
  listId: string;
  updateListItemAttachmentUrl: (url: string, index: number) => void;
  index: number;
  updateListItem: (index: number, values: UpdateListItemValues) => void;
}

export const UpdateListItemModal: React.FC<Props> = ({
  modalOpen,
  modalClose,
  listItem,
  listId,
  updateListItemAttachmentUrl,
  updateListItem,
  index,
}) => {
  const toast = useToast();
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const [loadingFileUpload, setLoadingFileUpload] = React.useState(false);
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: "image/*",
    maxFiles: 1,
    maxSize: 5242880, // 5mb
  });

  const initialValues: UpdateListItemValues = {
    name: listItem.name,
    description: listItem.description as string,
    // done: listItem.done,
  };

  React.useEffect(() => {
    if (acceptedFiles.length === 1) {
      uploadFile();
    }
  }, [acceptedFiles]);

  async function uploadFile() {
    setLoadingFileUpload(true);
    try {
      const listItemId = listItem._id;
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
      const uploadedImageUrl = `https://listu-${config.environment}.s3.amazonaws.com/${fileName}`;
      updateListItemAttachmentUrl(uploadedImageUrl, index);
    } catch (e) {
      if (e.response) {
        const errorMessage = e.response.data.message;
        toast(
          toastConfig("Yikes... There has been an error", "error", errorMessage)
        );
      } else {
        toast(
          toastConfig(
            "Yikes... There has been an error uploading your file",
            "error"
          )
        );
      }
    } finally {
      setLoadingFileUpload(false);
    }
  }

  async function updateListItemSubmit(values: UpdateListItemValues) {
    const updated = { ...listItem } as ListItemType;
    updated.name = values.name;
    updated.description = values.description || "";
    // updated.done = values.done;
    updateListItem(index, updated);
    modalClose();
  }

  return (
    <Modal isOpen={modalOpen} onClose={modalClose} size={"md"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              updateListItemSubmit(values);
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
                      <Textarea size="sm" {...field} rows={6} />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {/* <Field name="done"> // todo: make done work with formik, field needs to be updated manually
                  {({ field, form }) => (
                    <FormControl
                      id="done"
                      mt={SPACING_INPUTS}
                      isInvalid={form.errors.done && form.touched.done}
                    >
                      <Checkbox
                        onChange={(e) =>
                          field.setFieldValue("terms", e.target.checked)
                        }
                        size="lg"
                        colorScheme="teal"
                        {...field}
                      >
                        Mark as done
                      </Checkbox>
                      <FormErrorMessage>{form.errors.done}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field> */}
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
                    Created by <b>{listItem.createdBy.name}</b> on the{" "}
                    {longDateFormat(listItem.createdAt)}
                  </Text>
                </Stack>
                <Button
                  mt={SPACING_BUTTONS}
                  colorScheme="teal"
                  variant="solid"
                  isFullWidth
                  type="submit"
                >
                  Update
                </Button>
                <Button
                  mt={4}
                  mb={4}
                  isFullWidth
                  colorScheme="gray"
                  variant="outline"
                  onClick={modalClose}
                >
                  Back
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
