import { Fade, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Marker } from "react-mapbox-gl";
import { getLiveGPSCoordinates } from "../../../../utils/gps";

export const UserLocation = (props: { coordinates: any }) => {
  const { colorMode } = useColorMode();
  const [coordinates, setCoordinates] = React.useState([
    props.coordinates.longitude,
    props.coordinates.latitude,
  ]);
  const [long, lat] = coordinates;

  React.useLayoutEffect(() => {
    getLiveGPSCoordinates(setCoordinates);
  }, []);

  return (
    <Marker style={{ zIndex: 2 }} key="you-marker" coordinates={[long, lat]}>
      <Fade in>
        <div
          style={{ borderColor: colorMode === 'light' ? "white" : "black" }}
          className="you"
        />
      </Fade>
    </Marker>
  );
};
