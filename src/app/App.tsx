import * as React from "react";
import { Box, ChakraProvider, Flex, Grid, theme } from "@chakra-ui/react";
import { NavBar } from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { AuthenticatedProvider } from "../context/AuthenticatedContext";
import { Routes } from "./Routes";
import { Footer } from "../components/Footer";

export const Body: React.FC = ({ children }) => {
  return (
    <Grid
      height="100vh"
      overflow="auto"
      gridTemplateRows="auto 1fr auto"
      gridTemplateAreas="'header' 'main' 'footer'"
    >
      <NavBar />
      <Flex p={6} width="100%" justifyContent="center" alignItems="center">
        <Box maxW="960px">
        {children}
        </Box>
      </Flex>
      <Footer />
    </Grid>
  );
};

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthenticatedProvider>
          <Body>
            <Routes />
          </Body>
        </AuthenticatedProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};
