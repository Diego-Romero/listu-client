import {
  Flex,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import logo from "../images/icons/landing2.svg";


export const ListItemPage = () => {
  // const [ loading, setLoading ] = React.useState(false);
  // const history = useHistory()


  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card loading={false} maxHeight="400px">
        <Flex direction="row" align="center" justify="space-between" mb={4}>
          hola
          {/* <Heading size="lg">{list ? list.name : "List"}</Heading> */}
        </Flex>
      </Card>
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
    </Flex>
  );
};
