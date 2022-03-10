import { Tag } from "@chakra-ui/react";
import { useGlobalState } from "../../providers/root";
import { isMobile } from "react-device-detect";

export const CurrentCoordinates = () => {
  const { coordinates, meta } = useGlobalState();
  const { center } = coordinates;
  return (
    <Tag
      padding="1.5"
      boxShadow="xs"
      position="absolute"
      variant='solid'
      top={meta.isInstalled ? "110px" : "70px"}
      zIndex="4"
      right="none"
      minH="25px"
      colorScheme="yellow"
      left={isMobile ? 2 : (window.innerWidth - 154) / 2}
    >
      {center?.latitude?.toFixed(5)}, {center?.longitude?.toFixed(5)}
    </Tag>
  );
};
