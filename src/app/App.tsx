import * as React from "react";
import { Box, ChakraProvider, Flex, Grid, theme } from "@chakra-ui/react";
import { NavBar } from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { AuthenticatedProvider } from "../context/AuthenticatedContext";
import { Routes } from "./Routes";
import { Footer } from "../components/Footer";
import {
  LoadingContextProvider,
  useLoadingContext,
} from "../context/LoadingContext";
import { LoadingComponent } from "../components/Loading";

export const Body: React.FC = ({ children }) => {
  const { loading } = useLoadingContext();
  return (
    <Grid
      height="100vh"
      width="100vw"
      overflow="auto"
      gridTemplateRows="auto 1fr auto"
      gridTemplateAreas="'header' 'main' 'footer'"
    >
      <NavBar />
      <LoadingComponent loading={loading} />
      <Flex
        p={6}
        width="100%"
        justifyContent="center"
        alignItems="center"
        display={loading ? "none" : "flex"}
      >
        <Box maxW="960px">{children}</Box>
      </Flex>
      <Footer />
    </Grid>
  );
};

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {/* Contexts should go here */}
        <AuthenticatedProvider>
          <LoadingContextProvider>
            {/* End of contexts */}
            <Body>
              <Routes />
            </Body>
          </LoadingContextProvider>
        </AuthenticatedProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};
