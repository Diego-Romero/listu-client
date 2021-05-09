import {
  Flex,
  Text,
  Heading,
  Image,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/landing-teal.svg";
import { useHistory } from "react-router";
import { config, SPACING_BUTTONS } from "../config";
import { User } from "../type";
import { getUserRequest } from "../api/requests";
import { createToast } from "../utils/utils";
import { ListRow } from "../components/ListRow";

export const ListsPage = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const toast = useToast();
  const history = useHistory();

  React.useEffect(() => {
    fetchUser();
  }, []);

  const handleClick = (id) => {
    const url = config.routes.singleListUrl(id);
    history.push(url);
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await getUserRequest();
      setUser(data);
    } catch (_err) {
      toast(
        createToast(
          "Whoops, there has been an error fetching your lists",
          "error"
        )
      );
      history.push(config.routes.login);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card loading={loading}>
        <Heading mt={2} size="lg" textAlign="center" mb={4}>
          Your lists
        </Heading>
        {user !== null && user.lists.length > 0 ? (
          user.lists.map((list) => (
            <ListRow list={list} key={list._id} navigateToList={handleClick} />
          ))
        ) : (
          <Box>
            <Text>
              You do not seem to have any lists, maybe create a new one?
            </Text>
          </Box>
        )}
        <Button
          mt={SPACING_BUTTONS}
          colorScheme="teal"
          variant="outline"
          isFullWidth
          type="submit"
          onClick={() => history.push(config.routes.createList)}
        >
          Create a new list
        </Button>
        {/* <Button
          mt={3}
          variant="solid"
          isFullWidth
          onClick={() => history.push(config.routes.home)}
        >
          Home
        </Button> */}
      </Card>
      <Image mt={4} boxSize="350px" src={logo} alt="Login" />
    </Flex>
  );
};
