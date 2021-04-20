import * as React from "react";
import { Box, ChakraProvider, Flex, theme } from "@chakra-ui/react";
import { NavBar } from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { AuthenticatedProvider } from "../context/AuthenticatedContext";
import { Routes } from "./Routes";

export const Body: React.FC = ({ children }) => {
  return (
    <Flex direction="column" alignItems="center" justify="center" width="100%">
      <Box maxW={"960px"} p={6} width="100%">
        {children}
      </Box>
    </Flex>
  );
};

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthenticatedProvider>
          <NavBar />
          <Body>
            <Routes />
          </Body>
        </AuthenticatedProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};
