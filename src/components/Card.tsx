import { Box } from "@chakra-ui/react";
import React from "react";
import { LoadingComponent } from "./Loading";

interface Props {
  loading?: boolean;
  maxHeight?: string;
}

export const Card: React.FC<Props> = ({
  children,
  loading = false,
  maxHeight = "auto",
}) => (
  <Box
    width={["100%", "500px"]}
    borderStyle="solid"
    borderRadius="12px"
    maxHeight={maxHeight}
    overflow="auto"
    p={6}
    boxShadow="0px 2px 6px rgb(0 0 0 / 10%)"
    borderColor="gray.200"
    borderWidth="1px"
  >
    {loading ? <LoadingComponent loading={loading} /> : <Box>{children}</Box>}
  </Box>
);
