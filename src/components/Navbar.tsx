import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Link, useHistory } from "react-router-dom";
import { config } from "../config";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuthenticatedContext } from "../context/AuthenticatedContext";
import { createToast } from "../utils/utils";
import { IoMdExit } from "react-icons/io";

export const NavBar: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const { user, logout } = useAuthenticatedContext();
  async function logUserOut() {
    try {
      logout();
      localStorage.removeItem("token");
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
      color="white"
      bgGradient="linear(to-r, teal.500,green.500)"
      p={4}
      align="center"
      justify="space-between"
    >
      <Box display={["block", "block", "none"]}>
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
            <MenuItem onClick={() => history.push(config.routes.contact)}>
              Contact
            </MenuItem>
            {user !== null ? (
              <>
                <MenuItem onClick={() => history.push(config.routes.lists)}>
                  Lists
                </MenuItem>
                <MenuItem onClick={() => logUserOut()}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem onClick={() => history.push(config.routes.login)}>
                Login / Register
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Box>
      <Box display={["none", "none", "block"]}>
        <Breadcrumb fontWeight="medium" fontSize="lg" separator="-">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={config.routes.home}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={config.routes.contact}>
              Contact
            </BreadcrumbLink>
          </BreadcrumbItem>
          {user !== null ? (
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={config.routes.lists}>
                Lists
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : null}
        </Breadcrumb>
      </Box>
      <HStack>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Box display={["none", "none", "block"]}>
          {user !== null ? (
            <Tooltip label="Logout" aria-label="Logout">
              <IconButton
                size="md"
                variant="ghost"
                color="current"
                fontSize="2xl"
                onClick={() => logUserOut()}
                icon={<IoMdExit />}
                aria-label={`Logout`}
              />
            </Tooltip>
          ) : (
            <Breadcrumb fontWeight="medium" fontSize="lg" separator="-">
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to={config.routes.login}>
                  Login / Register
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          )}
        </Box>
      </HStack>
    </Flex>
  );
};
