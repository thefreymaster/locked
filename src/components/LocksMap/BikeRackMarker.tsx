import { Icon, useColorMode, Text, Flex } from "@chakra-ui/react";
import {
  HiOutlineBadgeCheck,
  HiOutlineXCircle,
  HiOutlineMinusCircle,
} from "react-icons/hi";
import { PRIMARY_GREEN, PRIMARY_YELLOW, PRIMARY_RED } from "../../constants";

const RatingMarker = (props: {
  overallRating: number;
  children: React.ReactNode;
  variant: "green" | "yellow" | "red";
}) => {
  const { colorMode } = useColorMode();
  const getZIndex = () => {
    if (props.variant === "green") {
      return 3;
    }
    if (props.variant === "yellow") {
      return 2;
    }
    return 1;
  };

  return (
    <Flex
      borderRadius="100px"
      justifyContent="center"
      alignItems="center"
      backgroundColor={colorMode === "light" ? "white" : "black"}
      boxShadow="md"
      transition="background-color 350ms ease-in-out"
      _hover={{
        boxShadow: "dark-lg",
      }}
      style={{
        zIndex: getZIndex(),
      }}
    >
      {props.children}
      <Text fontWeight={900} marginLeft="1" paddingRight="2">
        {props.overallRating}
      </Text>
    </Flex>
  );
};

const BikeRackMarker = (props: { overallRating: number }) => {
  const { colorMode } = useColorMode();
  const style = {
    fontSize: 15,
    width: 25,
    height: 25,
    backgroundColor: colorMode === "light" ? "white" : "black",
    top: "0px",
    left: "0px",
    borderRadius: "50px 50px 50px 50px",
    transition: "box-shadow 150ms ease-in-out",
  };

  if (props.overallRating >= 4) {
    return (
      <RatingMarker variant="green" overallRating={props.overallRating}>
        <HiOutlineBadgeCheck style={{ ...style, color: PRIMARY_GREEN }} />
      </RatingMarker>
    );
  }
  if (props.overallRating < 4 && props.overallRating > 3) {
    return (
      <RatingMarker variant="yellow" overallRating={props.overallRating}>
        <HiOutlineMinusCircle style={{ ...style, color: PRIMARY_YELLOW }} />
      </RatingMarker>
    );
  }
  return (
    <RatingMarker variant="red" overallRating={props.overallRating}>
      <HiOutlineXCircle style={{ ...style, color: PRIMARY_RED }} />
    </RatingMarker>
  );
};

export default BikeRackMarker;
