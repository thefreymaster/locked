import { Box, Divider, Switch } from "@chakra-ui/react";
import DeviceWrapper from "../../common/DeviceWrapper";
import Wrapper from "../../common/Wrapper";
import Font from "../../common/Font";
import { useGlobalState } from "../../providers/root";
import { isDesktop } from "react-device-detect";
import { BackButton } from "../../common/BackButton";
import { SwitchContainer } from "../Account/components/SwitchContainer";
import { MdGpsFixed } from "react-icons/md";
import { GrClose } from "react-icons/gr";

const MapSettings = () => {
  const { dispatch, coordinates } = useGlobalState();
  const { center } = coordinates;

  return (
    <Wrapper justifyContent="flex-start">
      <DeviceWrapper>
        <Box>
          <Box display="flex" flexDir="row" alignItems="center">
            <BackButton />
            <Box>
              <Font variant="primary" fontWeight="bold" fontSize="32px">
                Map Settings
              </Font>
            </Box>
            <Box flexGrow={1} />
          </Box>
        </Box>
        <SwitchContainer>
          <GrClose />
          <Box pr="2" pl="2" marginLeft={2}>
            Center Marker
          </Box>
          <Box flexGrow={1} />
          <Switch
            onChange={() =>
              center.showCenter
                ? dispatch({ type: "HIDE_CENTER" })
                : dispatch({ type: "SHOW_CENTER" })
            }
            isChecked={center.showCenter}
            colorScheme="yellow"
            size={isDesktop ? "md" : "lg"}
          />
        </SwitchContainer>
        <SwitchContainer>
          <MdGpsFixed />
          <Box pr="2" pl="2" marginLeft={2}>
            Current Coordinates
          </Box>
          <Box flexGrow={1} />
          <Switch
            onChange={() =>
              coordinates.showCoordinates
                ? dispatch({ type: "HIDE_CURRENT_COORDINATES" })
                : dispatch({ type: "SHOW_CURRENT_COORDINATES" })
            }
            isChecked={coordinates.showCoordinates}
            colorScheme="yellow"
            size={isDesktop ? "md" : "lg"}
          />
        </SwitchContainer>
      </DeviceWrapper>
    </Wrapper>
  );
};

export default MapSettings;
