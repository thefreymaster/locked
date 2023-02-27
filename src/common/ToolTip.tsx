import React from "react";
import { Tooltip as ChakraTooltip } from "@chakra-ui/react";

const ToolTip = (props: {
  children: React.ReactNode;
  label: string;
  placement?: string;
}) => {
  return (
    <ChakraTooltip
      hasArrow
      bg="gray.300"
      color="black"
      // @ts-ignore
      placement={props.placement}
      label={props.label}
      aria-label={props.label}
    >
      {props.children}
    </ChakraTooltip>
  );
};

ToolTip.defaultProps = {
    placement: "top"
};

export default ToolTip;
