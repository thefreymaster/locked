import { Badge, Box } from "@chakra-ui/react";
import { capitalize } from "lodash";
import React from "react";
import { RiWalkFill } from "react-icons/ri";
import ToolTip from "../../common/ToolTip";

const Traffic = (props: { traffic: string; variant: "drawer" | "modal" }) => {
  if (!props.traffic) {
    return null;
  }
  const getColor = () => {
    if (props.traffic === "high") {
      return "green";
    }
    if (props.traffic === "medium") {
      return "yellow";
    }
    return "red";
  };
  return (
    <ToolTip label={`${capitalize(props.traffic)} Foot Traffic`}>
      <Box display="flex" alignItems="center">
        <Box marginRight="1px" />
        <Badge size="xl" variant="solid" colorScheme={getColor()} minH="25px" display="flex" alignItems="center" justifyContent="center">
          <RiWalkFill style={{ fontSize: 20, padding: 5 }} />
        </Badge>
        <Box marginRight="8px" />
      </Box>
    </ToolTip>
  );
};

export default Traffic;
