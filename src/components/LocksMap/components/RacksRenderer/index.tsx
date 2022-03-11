import { useHistory } from "react-router-dom";
import { useGlobalState } from "../../../../providers/root";
import { isMobile } from "react-device-detect";
import { calculateOverallRating } from "../../../../utils/calcOverallRating";
import { Marker } from "react-mapbox-gl";
import { Fade } from "@chakra-ui/react";
import BikeRackMarker from "../../BikeRackMarker";

export const RacksRenderer = (props: {
  setPopupViewport(v: any): void;
  setViewport(v: any): void;
}) => {
  const global = useGlobalState();
  const { locks } = global;
  const history = useHistory();

  const handleClick = (
    value: any,
    key: string,
    latAdjustmentPopup: number,
    latAdjustmentViewport: number
  ) => {
    props.setPopupViewport({
      visible: true,
      coordinates: [
        value.location.long,
        value.location.lat + latAdjustmentPopup,
      ],
      lock: value,
      id: key,
    });
    props.setViewport({
      zoom: 16,
      latitude: value.location.lat + latAdjustmentViewport,
      longitude: value.location.long,
    });
    history.push(`/map/${key}`);
  };

  return (
    <>
      {Object.entries(locks).map(([key, value]) => {
        const { location, ratings } = value;
        const latAdjustmentPopup = isMobile
          ? 0.0001590001135
          : 0.00015590001135;
        const latAdjustmentViewport = isMobile
          ? 0.00239590001135
          : 0.00199590001135;
        const overallRating = calculateOverallRating({ ratings });
        return (
          <Marker
            onClick={() =>
              handleClick(value, key, latAdjustmentPopup, latAdjustmentViewport)
            }
            key={`friend-marker-${key}`}
            coordinates={[location.long, location.lat]}
            className="rack-marker"
          >
            <Fade in>
              <BikeRackMarker overallRating={overallRating} />
            </Fade>
          </Marker>
        );
      })}
    </>
  );
};
