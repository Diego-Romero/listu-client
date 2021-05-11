import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import logo from "../images/icons/join.svg";

export const Login = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <Flex direction="column" justify="center" align="center" mt={[0, 0, 8]}>
      <Card loading={loading}>
        <Tabs size="lg" isFitted colorScheme="teal">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LoginForm setLoading={setLoading}/>
            </TabPanel>
            <TabPanel>
              <RegisterForm setLoading={setLoading} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
      <Image mt={4} boxSize="400px" src={logo} alt="Login" />
    </Flex>
  );
};
