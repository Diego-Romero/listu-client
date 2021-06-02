import {
  Box,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useHistory } from "react-router-dom";
import { config } from "../config";
import { useUserContext } from "../context/UserContext";
import { toastConfig } from "../utils/utils";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useUiContext } from "../context/UiContext";
import { FiSidebar } from "react-icons/fi";
import { FaRegKeyboard } from "react-icons/fa";
import { KeymapModal } from "./KeymapModal";
import MouseTrap from "mousetrap";

export const NavBar: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const { user, removeUser } = useUserContext();
  const { navBarOpen, setNavBarOpen } = useUiContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setColorMode } = useColorMode();

  React.useEffect(() => {
    MouseTrap.bind("ctrl+k", () => onOpen());
    MouseTrap.bind("ctrl+l", () => setColorMode("light"));
    MouseTrap.bind("ctrl+d", () => setColorMode("dark"));
  }, []);

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
                <Tooltip
                  label="Keyboard shortcuts"
                  aria-label="Keyboard shortcuts"
                  display={["none", "none", "block"]}
                >
                  <IconButton
                    ml={4}
                    size="md"
                    variant="ghost"
                    color="current"
                    fontSize="2xl"
                    onClick={onOpen}
                    icon={<FaRegKeyboard />}
                    aria-label={`Keyboard shortcuts`}
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
        ) : null}
      </Box>
      <HStack>
        <ColorModeSwitcher justifySelf="flex-end" />
        {user !== null ? (
          <>
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
          </>
        ) : null}
      </HStack>
      <KeymapModal modalOpen={isOpen} modalClose={onClose} />
    </Flex>
  );
};
