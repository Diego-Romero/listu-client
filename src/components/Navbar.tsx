import {
  Box,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useHistory } from "react-router-dom";
import { config } from "../config";
import { useAuthenticatedContext } from "../context/AuthenticatedContext";
import { toastConfig } from "../utils/utils";
import { IoMdLogOut, IoMdHome, IoMdLogIn } from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";

export const NavBar: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const { user, logout } = useAuthenticatedContext();
  async function logUserOut() {
    try {
      logout();
      localStorage.removeItem("token");
      toast(toastConfig("See you soon!", "success"));
      history.push(config.routes.home);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        toastConfig("Yikes... There has been an error", "error", errorMessage)
      );
    }
  }

  return (
    <Flex
      direction="row"
      color="white"
      bgGradient="linear(to-r, teal.500,green.500)"
      p={4}
      align="center"
      justify="space-between"
    >
      {/* desktop view */}
      <Box >
        {user !== null ? (
          <IconButton
            size="md"
            variant="ghost"
            color="current"
            fontSize="2xl"
            onClick={() => history.push(config.routes.lists)}
            icon={<AiOutlineUnorderedList />}
            aria-label={`Go to lists`}
          />
        ) : (
          <IconButton
            size="md"
            variant="ghost"
            color="current"
            fontSize="2xl"
            onClick={() => history.push(config.routes.home)}
            icon={<IoMdHome />}
            aria-label={`Go to home`}
          />
        )}
      </Box>
      <HStack>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Box >
          {user !== null ? (
            <Tooltip label="Logout" aria-label="Logout">
              <IconButton
                size="md"
                variant="ghost"
                color="current"
                fontSize="2xl"
                onClick={() => logUserOut()}
                icon={<IoMdLogOut />}
                aria-label={`Logout`}
              />
            </Tooltip>
          ) : (
            <Tooltip label="Login" aria-label="Login">
              <IconButton
                size="md"
                variant="ghost"
                color="current"
                fontSize="2xl"
                onClick={() => history.push(config.routes.login)}
                icon={<IoMdLogIn />}
                aria-label={`Login`}
              />
            </Tooltip>
          )}
        </Box>
      </HStack>
    </Flex>
  );
};
