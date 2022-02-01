import { Badge, Box } from "@chakra-ui/layout";
import React from "react";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import ToolTip from "../../common/ToolTip";

const RackRecommendation = (props: {
  variant: "drawer" | "modal";
  recommended: boolean;
}) => {
  return props.recommended ? (
    <ToolTip label="Recommendation">
      <Box display="flex" alignItems="center">
        <Box marginRight="1px" />
        <Badge
          variant="solid"
          colorScheme="green"
          minH="25px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {props.variant === "drawer" ? (
            "Recommended"
          ) : (
            <RiThumbUpFill style={{ fontSize: 20, padding: 5 }} />
          )}
        </Badge>
        <Box marginRight="8px" />
      </Box>
    </ToolTip>
  ) : (
    <ToolTip label="Recommendation">
      <Box display="flex" alignItems="center">
        <Box marginRight="1px" />
        <Badge
          variant="solid"
          colorScheme="red"
          minH="25px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {props.variant === "drawer" ? (
            "Not Recommended"
          ) : (
            <RiThumbDownFill style={{ fontSize: 20, padding: 5 }} />
          )}
        </Badge>
        <Box marginRight="8px" />
      </Box>
    </ToolTip>
  );
};

export default RackRecommendation;
