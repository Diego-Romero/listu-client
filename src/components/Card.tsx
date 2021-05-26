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
    width={["100%", "500px", "600px"]}
    borderStyle="solid"
    borderRadius="12px"
    maxHeight={maxHeight}
    overflow="auto"
    p={6}
    boxShadow="0px 2px 6px rgb(0 0 0 / 10%)"
    // boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)"
    borderColor="gray.200"
    borderWidth="1px"
  >
    {loading ? <LoadingComponent loading={loading} /> : <Box>{children}</Box>}
  </Box>
);
