import { Box } from "@chakra-ui/react";
import React from "react";
import { LoadingComponent } from "./Loading";

interface Props {
  maxHeight?: string;
  loading?: boolean;
}

export const Card: React.FC<Props> = ({
  children,
  maxHeight = "auto",
  loading = false,
}) => (
  <Box
    w={["85vw", "80vw", "75vw", "55vw", "50vw", "40vw"]}
    borderStyle="solid"
    borderRadius="12px"
    maxHeight={maxHeight}
    overflow="auto"
    p={6}
    boxShadow="0px 2px 6px rgb(0 0 0 / 10%)"
    borderColor="gray.200"
    borderWidth="1px"
  >
    {loading ? <LoadingComponent /> : <Box>{children}</Box>}
  </Box>
);
