import {
  Flex,
  Text,
  Heading,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Stack,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/undraw_team_up_ip2x.svg";
import { useHistory } from "react-router";
import { config, SPACING_BUTTONS } from "../config";
import { List } from "../type";

export const ListsPage = () => {
  const [lists, setLists] = React.useState<List[]>([]);
  console.log(setLists);
  // setLists([]) // todo: delete
  const [loading, setLoading] = React.useState(false);
  console.log(setLoading);
  // setLoading(false) // todo: delete
  // const toast = useToast();
  const history = useHistory();
  const handleClick = (id) => {
    const url = config.routes.singleListUrl(id);
    history.push(url);
  };

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      {loading ? (
        <Heading>Loading</Heading>
      ) : (
        <Card maxW={"500px"}>
          <Heading mt={2} size="lg">
            {lists.length === 0
              ? "Uh Oh! You do not have any lists, you should create one!"
              : "Here are your lists"}
          </Heading>
          <Accordion mt={4}>
            {lists.length > 0
              ? lists.map((list) => (
                  <AccordionItem key={list.listId} pt={2} pb={2}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Heading fontSize="lg">{list.name}</Heading>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      {list.description ? (
                        <Box mt={2}>
                          <Text as="u">Description:</Text> {list.description}
                        </Box>
                      ) : null}
                      {/* {item.friends.length > 0 ? (
                        <Box mt={2}>
                          <Text as="u">Friends:</Text>{" "}
                          {concatFriendsNames(item.friends)}
                        </Box>
                      ) : null} */}
                      <Stack direction="row" spacing={4} mt={6}>
                        <Button
                          variant="outline"
                          onClick={() => handleClick(list.listId)}
                        >
                          Open
                        </Button>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                ))
              : null}
          </Accordion>
          <Button
            mt={SPACING_BUTTONS}
            colorScheme="yellow"
            variant="outline"
            isFullWidth
            type="submit"
            onClick={() => history.push(config.routes.createList)}
          >
            Create a new shiny list!
          </Button>
        </Card>
      )}
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
    </Flex>
  );
};
