import * as React from "react";
import { Box, ChakraProvider, extendTheme, Grid } from "@chakra-ui/react";
import { NavBar } from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "../context/UserContext";
import { Routes } from "./Routes";
import { Footer } from "../components/Footer";
import { UiContextProvider } from "../context/UiContext";

export const Body: React.FC = ({ children }) => {
  return (
    <Grid
      height="100vh"
      width="100vw"
      overflow="auto"
      gridTemplateRows="auto 1fr auto"
      gridTemplateAreas="'header' 'main' 'footer'"
    >
      <NavBar />
      <Box height="100%" width="100%">
        {children}
      </Box>
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
        <UserContextProvider>
          <UiContextProvider>
            {/* End of contexts */}
            <Body>
              <Routes />
            </Body>
          </UiContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};
