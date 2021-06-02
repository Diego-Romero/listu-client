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
import { useUserContext } from "../context/UserContext";
import { toastConfig } from "../utils/utils";
import { IoMdLogOut, IoMdHome, IoMdLogIn } from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useUiContext } from "../context/UiContext";
import { FiSidebar } from "react-icons/fi";
import { FaRegKeyboard } from "react-icons/fa";
import { SmallAddIcon } from "@chakra-ui/icons";

export const NavBar: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const { user, removeUser } = useUserContext();
  const { navBarOpen, setNavBarOpen } = useUiContext();

  const location = useLocation();

  async function logUserOut() {
    try {
      removeUser();
      localStorage.removeItem("token");
      history.push(config.routes.home);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        toastConfig("Yikes... There has been an error", "error", errorMessage)
      );
    }
  }

  function isOnListPage(): boolean {
    return config.routes.lists === location.pathname;
  }

  return (
    <Flex
      direction="row"
      color="white"
      bgGradient="linear(to-r, teal.400,green.400)"
      p={4}
      align="center"
      justify="space-between"
    >
      <Box>
        {user !== null ? (
          <>
            {isOnListPage() ? (
              <>
                <Tooltip label="Toggle side nav" aria-label="Toggle side nav">
                  <IconButton
                    size="md"
                    variant="ghost"
                    color="current"
                    fontSize="2xl"
                    isActive={navBarOpen}
                    onClick={() => setNavBarOpen(!navBarOpen)}
                    icon={<FiSidebar />}
                    aria-label={`Toggle side nav`}
                  />
                </Tooltip>
                <Tooltip label="New list" aria-label="New list">
                  <IconButton
                    size="md"
                    variant="ghost"
                    color="current"
                    ml={2}
                    fontSize="2xl"
                    onClick={() => console.log("Open new list modal")}
                    icon={<SmallAddIcon />}
                    aria-label={`New list`}
                  />
                </Tooltip>
              </>
            ) : (
              <Tooltip label="Go to lists" aria-label="go to lists">
                <IconButton
                  size="md"
                  variant="ghost"
                  color="current"
                  fontSize="2xl"
                  onClick={() => history.push(config.routes.lists)}
                  icon={<AiOutlineUnorderedList />}
                  aria-label={`Go to lists`}
                />
              </Tooltip>
            )}
          </>
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
        <Tooltip label="Keyboard shortcuts" aria-label="Keyboard shortcuts">
          <IconButton
            size="md"
            variant="ghost"
            color="current"
            fontSize="2xl"
            onClick={() => console.log("open keyboard modal")}
            icon={<FaRegKeyboard />}
            aria-label={`Keyboard shortcuts`}
          />
        </Tooltip>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Box>
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
