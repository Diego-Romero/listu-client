import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import * as React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useHistory } from "react-router-dom";
import { config } from "../config";
import { HamburgerIcon, MinusIcon } from "@chakra-ui/icons";

export const NavBar: React.FC = () => {
  const history = useHistory();
  const isAuthenticated = false;

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
          <MenuItem
            onClick={() => history.push(config.routes.home)}
          >
            Home
          </MenuItem>
          {isAuthenticated ? (
            <MenuItem
              icon={<MinusIcon />}
              // onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </MenuItem>
          ) : null}
        </MenuList>
      </Menu>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
};
