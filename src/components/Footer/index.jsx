import React from "react";

import Flex from "../../common/Flex";
import { Box, Icon, Slide, Text } from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import { useGlobalState } from "../../providers/root";
import { RiSettings2Line, RiMapPinLine } from "react-icons/ri";

const Footer = () => {
  const { meta, coordinates, firebase } = useGlobalState();
  const location = useLocation();
  const history = useHistory();

  const { pathname } = location;
  const fixed = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 5,
    minHeight: 90,
    maxHeight: 90,
    borderTop: "1px solid #edf2f7",
  };

  const mapActiveColor = pathname.includes("map") && "#d49f00";
  const accountActiveColor = pathname.includes("account") && "#d49f00";

  if (
    !firebase.isValidatingAuthentication &&
    coordinates.hasCoordinates &&
    (history.location.pathname.includes("/map") ||
      history.location.pathname.includes("/account"))
  ) {
    return (
      // <Slide direction="bottom" in={meta.isInstalled} style={{ zIndex: 10 }}>
      <Box
        width="100%"
        style={{ ...fixed }}
        display="flex"
        backgroundColor="gray.50"
        padding={meta.isInstalled ? "15px 0px 30px 0px" : "15px 20px"}
      >
        <Flex
          height="42px"
          onClick={() => history.push("/map")}
          width="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Icon as={RiMapPinLine} color={mapActiveColor} w={7} h={7} />
          <Text fontWeight={700} fontSize={10} color={mapActiveColor}>
            Map
          </Text>
        </Flex>
        <Flex
          height="42px"
          onClick={() => history.push("/account")}
          width="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Icon as={RiSettings2Line} color={accountActiveColor} w={7} h={7} />
          <Text fontWeight={700} fontSize={10} color={accountActiveColor}>
            Settings
          </Text>
        </Flex>
      </Box>
      // </Slide>
    );
  }
  return null;
};

export default Footer;
