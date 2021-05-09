import * as React from "react";
import { Box, ChakraProvider, extendTheme, Flex, Grid } from "@chakra-ui/react";
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
        pt={10}
        px={4}
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

const themeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const theme = extendTheme({ config: themeConfig });

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
