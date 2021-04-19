import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
  width?: string;
  maxW?: string;
}

export const Card: React.FC<Props> = ({
  children,
  width = "100%",
  maxW = "auto",
}) => (
  <Box
    width={width}
    maxW={maxW}
    borderStyle="solid"
    borderRadius="12px"
    p={6}
    boxShadow="0px 2px 6px rgb(0 0 0 / 10%)"
    borderColor="gray.200"
    borderWidth="1px"
  >
    {children}
  </Box>
);
