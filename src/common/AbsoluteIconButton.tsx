import { IconButton } from "@chakra-ui/react";
import React from "react";
import { PRIMARY_COLOR_SCHEME } from "../constants";
import { useGlobalState } from "../providers/root";

const AbsoluteIconButton = (props: any) => {
  const { meta } = useGlobalState();
  const fixedButton = {
    position: "fixed",
    bottom: props.bottom ? props.bottom : meta.isInstalled ? 100 : 20,
    right: props.right || 20,
    left: props.left,
    top: props.top,
    borderRadius: props.round && 100,
    width: props.round && 50,
    height: props.round && 50,
  };
  if (props.isHidden) {
    return null;
  }
  return (
    <IconButton
      leftIcon={props.leftIcon}
      zIndex={1}
      margin={props.margin}
      colorScheme={props.colorScheme ?? PRIMARY_COLOR_SCHEME}
      isLoading={props.loading}
      disabled={props.disabled}
      boxShadow="base"
      style={fixedButton}
      _active={{
        boxShadow: "xs",
      }}
      _focus={{
        boxShadow: "xs",
      }}
      _hover={{
        boxShadow: "lg",
      }}
      onClick={props.onClick}
      icon={props.children}
      {...props}
    />
  );
};

export default AbsoluteIconButton;
