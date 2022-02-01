import { Badge, Box } from "@chakra-ui/layout";
import React from "react";
import ToolTip from "../../common/ToolTip";

const RackSize = (props: {
  size: "sm" | "md" | "lg";
  variant: "drawer" | "modal";
}) => {
  if (props.size === "sm") {
    return (
      <ToolTip label={`${props.size.toUpperCase()} Size`}>
        <Box display="flex" alignItems="center">
          <Box marginRight="1px" />
          <Badge variant="subtle" colorScheme="red">
            {props.variant === "drawer" ? "Small" : "SM"}
          </Badge>
          <Box marginRight="8px" />
        </Box>
      </ToolTip>
    );
  }
  if (props.size === "md") {
    return (
      <ToolTip label={`${props.size.toUpperCase()} Size`}>
        <Box display="flex" alignItems="center">
          <Box marginRight="1px" />
          <Badge variant="subtle" colorScheme="yellow">
            {props.variant === "drawer" ? "Medium" : "MD"}
          </Badge>
          <Box marginRight="8px" />
        </Box>
      </ToolTip>
    );
  }
  return (
    <ToolTip label={`${props.size.toUpperCase()} Size`}>
      <Box display="flex" alignItems="center">
        <Box marginRight="1px" />
        <Badge variant="subtle" colorScheme="green">
          {props.variant === "drawer" ? "Large" : "LG"}
        </Badge>
        <Box marginRight="8px" />
      </Box>
    </ToolTip>
  );
};

export default RackSize;
