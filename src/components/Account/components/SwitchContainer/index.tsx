import { Box } from "@chakra-ui/react";
import React from "react";

export const SwitchContainer = (props: { children: React.ReactNode }) => {
  return (
    <Box borderRadius="lg" boxShadow="md" marginTop={4} padding={4} minW="100%">
      <Box
        minW="100%"
        borderBottomRightRadius="0px"
        borderBottomLeftRadius="0px"
        display="flex"
        alignItems="center"
      >
        {props.children}
      </Box>
    </Box>
  );
};
