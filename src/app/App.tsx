import * as React from "react";
import { Box, ChakraProvider, Flex, Heading, theme } from "@chakra-ui/react";
import { NavBar } from "../components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Landing } from "../pages/LandingPage";
import { Login } from "../pages/LoginPage";
import { config } from "../config";
import { CreateListPage } from "../pages/CreateListPage";
import { ListsPage } from "../pages/ListsPage";
import { ViewListPage } from "../pages/ViewListPage";
import { FourOFourPage } from "../pages/404Page";

export const Loading: React.FC = () => (
  <Flex direction="column" alignItems="center" justify="center" width="100%">
    <Box maxW={"960px"} p={6} width="100%" textAlign="center">
      <Heading>Loading</Heading>
    </Box>
  </Flex>
);

export const Body: React.FC = ({ children }) => {
  return (
    <Flex direction="column" alignItems="center" justify="center" width="100%">
      <Box maxW={"960px"} p={6} width="100%">
        {children}
      </Box>
    </Flex>
  );
};

// const ProtectedRoute = ({ component, ...args }) => (
//   <Route
//     component={withAuthenticationRequired(component, {
//       onRedirecting: () => <Loading />,
//     })}
//     {...args}
//   />
// );

export const App = () => {
  // const history = useHistory();
  // const onRedirectCallback = (appState) => {
  //   history.push(appState?.returnTo || window.location.pathname);
  // };
  return (
    <ChakraProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Body>
            <Switch>
              <Route path={config.routes.login} exact>
                <Login />
              </Route>
              <Route path={config.routes.createList} exact>
                <CreateListPage />
              </Route>
              <Route path={config.routes.lists} exact>
                <ListsPage />
              </Route>
              {/* <ProtectedRoute path={config.routes.lists} component={<ListsPage />} /> */}
              <Route path={config.routes.lists}>
                <ListsPage />
              </Route>
              <Route path={config.routes.list}>
                <ViewListPage />
              </Route>
              <Route path={config.routes.home} exact>
                <Landing />
              </Route>
              <Route>
                <FourOFourPage />
              </Route>
            </Switch>
          </Body>
        </BrowserRouter>
    </ChakraProvider>
  );
};
