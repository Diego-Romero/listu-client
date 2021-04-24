import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/undraw_true_love_cy8x.svg";
import { BiPlus } from "react-icons/bi";
import { config, SPACING_BUTTONS } from "../config";
import { useHistory } from "react-router";
import { CreateListItemForm } from "../components/CreateItemForm";
import { ListItem } from "../type";

export const ViewListPage = () => {
  const history = useHistory();
  const [items, setItems] = React.useState<ListItem[]>([]);
  // const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  // const { id } = useParams<ParamTypes>();
  // const [file, setFiles] = React.useState(null);

  async function getListData() {
    setLoading(true)
    setItems([])
  }

  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  React.useEffect(() => {
    getListData()
  }, [])

  // const getItems = async () => {
  //   setLoading(true);
  //   // try {
  //   //   const token = await getAccessTokenSilently();
  //   //   const url = `${config.env.serverUrl}/list/${id}`;
  //   //   const response = await fetch(url, {
  //   //     headers: {
  //   //       Authorization: `Bearer ${token}`,
  //   //     },
  //   //   });
  //   //   const data: ListItem[] = await response.json();
  //   //   console.log("response from loading items", data);
  //   //   setItems(data);
  //   // } catch (error) {
  //   //   console.log("error fetching from the api", error);
  //   //   toast({
  //   //     title: "Sorry!",
  //   //     description: "Something has gone wrong",
  //   //     status: "error",
  //   //     duration: 6000,
  //   //     isClosable: true,
  //   //   });
  //   //   history.push(config.routes.home);
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  //   setLoading(false)
  // };

  const createNewItem = async (body) => {
    console.log("creating new item", body);
    // todo: implement this
    // try {
    //   const token = await getAccessTokenSilently();
    //   const url = `${config.env.serverUrl}/list/${id}`;
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(body),
    //   });
    //   const data = await response.json();
    //   console.log("response from creating a new item", data);
    //   toast({
    //     title: "Whoop 🙌",
    //     description: "Created!",
    //     status: "success",
    //     duration: 6000,
    //     isClosable: true,
    //   });
    //   await getItems();
    // } catch (error) {
    //   console.log("error fetching from the api", error);
    //   toast({
    //     title: "Sorry!",
    //     description: "Something has gone wrong",
    //     status: "error",
    //     duration: 6000,
    //     isClosable: true,
    //   });
    // }
  };

  // React.useEffect(() => {
  //   getItems();
  // }, [getAccessTokenSilently]);

  async function deleteItem(itemId: string) {
    console.log(itemId);
    // todo: implement item
    // console.log("deleting item", itemId);
    // try {
    //   const token = await getAccessTokenSilently();
    //   const url = `${config.env.serverUrl}/list/${id}/item/${itemId}`;
    //   const response = await fetch(url, {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   const data = await response.json();
    //   console.log("response from deleting item", data);
    //   toast({
    //     title: "Whoop 🙌",
    //     description: "Done!",
    //     status: "success",
    //     duration: 6000,
    //     isClosable: true,
    //   });
    //   await getItems();
    // } catch (error) {
    //   console.log("error fetching from the api", error);
    //   toast({
    //     title: "Sorry!",
    //     description: "Something has gone wrong",
    //     status: "error",
    //     duration: 6000,
    //     isClosable: true,
    //   });
    // }
  }

  async function uploadImage(event, itemId: string) {
    console.log(event, itemId);
    // todo: implement upload image
    // const files = event.target.files;
    // if (!files) return;
    // setFiles(files[0]);
    // try {
    //   const token = await getAccessTokenSilently();
    //   const url = `${config.env.serverUrl}/list-item/${itemId}/attachment`;
    //   const generateUrlForUpload = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   const urlForUpload = await generateUrlForUpload.json();
    //   await fetch(urlForUpload.uploadUrl, {
    //     method: "PUT",
    //     body: file,
    //   });

    //   const urlForUpdatingAttachment = `${config.env.serverUrl}/list/${id}/item/${itemId}/attachment`;
    //   await fetch(urlForUpdatingAttachment, {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   await getItems();
    // } catch (error) {
    //   console.log("error fetching from the api", error);
    //   toast({
    //     title: "Sorry!",
    //     description: "Something has gone wrong",
    //     status: "error",
    //     duration: 6000,
    //     isClosable: true,
    //   });
    // }
  }

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      {loading ? (
        <Heading>Loading</Heading>
      ) : (
        <Card maxW={"500px"}>
          <Flex direction="row" align="center" justify="space-between">
            <Heading size="lg">List</Heading>
            <Stack direction="row" spacing={4}>
              {/* <Tooltip label="Add or review users" aria-label="A tooltip">
              <IconButton
                variant="ghost"
                colorScheme="black"
                aria-label="done"
                fontSize="2xl"
                size="xl"
                mr={2}
                icon={<AiOutlineSetting />}
                onClick={drawerOnOpen}
              />
            </Tooltip> */}

              <Tooltip label="New item!" aria-label="A tooltip">
                <IconButton
                  variant="ghost"
                  colorScheme="yellow"
                  aria-label="done"
                  fontSize="3xl"
                  size="xl"
                  mr={2}
                  icon={<BiPlus />}
                  onClick={modalOnOpen}
                />
              </Tooltip>
            </Stack>
          </Flex>

          {items.length > 0 ? (
            <Accordion mt={4}>
              {items.map((item) => (
                <AccordionItem key={item.itemId} pt={2} pb={2}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Heading fontSize="lg">{item.name}</Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    {item.description ? (
                      <Box mt={2}>
                        <Text as="u">Description:</Text> {item.description}
                      </Box>
                    ) : null}
                    <Box mt={2}>
                      <Text as="u">Creation Date:</Text> {item.createdAt}
                    </Box>

                    <Stack direction="row" spacing={4} mt={6}>
                      <Tooltip label="Sweet!" aria-label="delete this todo">
                        <Button onClick={() => deleteItem(item.itemId)}>
                          Done
                        </Button>
                      </Tooltip>
                      {/* <Tooltip
                        label="Sweet!"
                        aria-label="attach an image to this todo"
                      >
                        <Button onClick={() => uploadImage(item.itemId)}>
                          Upload attachment
                        </Button>
                      </Tooltip> */}
                    </Stack>
                    {!item.attachment ? (
                      <Box mt={4}>
                        <label>Attach a file</label>
                        <input
                          type="file"
                          accept="image/*"
                          placeholder="Add an image"
                          onChange={(event) => uploadImage(event, item.itemId)}
                        />
                      </Box>
                    ) : (
                      <Box mt={4}>
                        <Text>Attachment</Text>
                        <Image
                          boxSize="200px"
                          src={item.attachment}
                          alt="attachment"
                        />
                      </Box>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Text mt={4}>You have no items!</Text>
          )}

          <Button
            mt={SPACING_BUTTONS}
            variant="outline"
            isFullWidth
            onClick={() => history.push(config.routes.lists)}
          >
            Back
          </Button>
        </Card>
      )}
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
      <Modal isOpen={modalIsOpen} onClose={modalOnClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalCloseButton />
          <ModalBody>
            <CreateListItemForm createNewItem={createNewItem} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <Drawer
        size="md"
        placement={"right"}
        onClose={drawerOnClose}
        isOpen={drawerIsOpen}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Settings 🛠</DrawerHeader>
            <DrawerBody>
              {mockList.description ? (
                <Box>
                  <Heading mt={4} size="md">
                    Description
                  </Heading>
                  <Text mt={4}>{mockList.description}</Text>
                </Box>
              ) : null}
              <Heading mt={4} size="md">
                Want to add someone else?
              </Heading>
              <AddFriendForm />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer> */}
    </Flex>
  );
};
