import { Box, Badge, Divider, Switch } from "@chakra-ui/react";
import DeviceWrapper from "../../common/DeviceWrapper";
import Wrapper from "../../common/Wrapper";
import Font from "../../common/Font";
import { useGlobalState } from "../../providers/root";

const MapSettings = () => {
  const { dispatch, coordinates } = useGlobalState();
  const { center } = coordinates;

  return (
    <Wrapper justifyContent="flex-start">
      <DeviceWrapper>
        <Box>
          <Box display="flex" flexDir="row" alignItems="center">
            <Box>
              <Font variant="primary" fontWeight="bold" fontSize="32px">
                Map Settings
              </Font>
            </Box>
            <Box flexGrow={1} />
            {/* <Box>
              <Badge colorScheme="purple">BETA</Badge>
            </Box> */}
          </Box>
        </Box>
        <Divider mt={2} mb={2} />
        <Box display="flex" flexDir="row" alignItems="center">
          <Box pr="2" pl="2">
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
            size="md"
          />
        </Box>
        <Divider mt={2} mb={2} />
        <Box display="flex" flexDir="row" alignItems="center">
          <Box pr="2" pl="2">
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
            size="md"
          />
        </Box>
      </DeviceWrapper>
    </Wrapper>
  );
};

export default MapSettings;
