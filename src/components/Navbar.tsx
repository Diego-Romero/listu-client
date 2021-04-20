import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useHistory } from "react-router-dom";
import { config } from "../config";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuthenticatedContext } from "../context/AuthenticatedContext";
import { logoutRequest } from "../api/requests";
import { createToast } from "../utils/utils";

export const NavBar: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const { user, logout } = useAuthenticatedContext();
  async function logUserOut() {
    try {
      await logoutRequest();
      logout();
      toast(createToast("See you soon!", "success"));
      history.push(config.routes.home);
    } catch (e) {
      const errorMessage = e.response.data.message;
      toast(
        createToast("Yikes... There has been an error", "error", errorMessage)
      );
    }
  }

  return (
    <Flex
      direction="row"
      bg={config.colors.default}
      p={4}
      align="center"
      justify="space-between"
    >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon fontSize="2xl" />}
          size="lg"
          variant="ghost"
        />
        <MenuList>
          <MenuItem onClick={() => history.push(config.routes.home)}>
            Home
          </MenuItem>
          {user !== null ? (
            <MenuItem onClick={() => logUserOut()}>Logout</MenuItem>
          ) : (
            <MenuItem onClick={() => history.push(config.routes.login)}>
              Login / Register
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
};
