import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { calculateOverallRating } from "../../../../utils/calcOverallRating";
import { Marker } from "react-mapbox-gl";
import { Fade } from "@chakra-ui/react";
import BikeRackMarker from "../../BikeRackMarker";
import React from "react";
import firebaseApi from "../../../../api/firebase";
import { useGlobalState } from "../../../../providers/root";
import { ILock } from "../../../../interfaces/ILock";

export const RacksRenderer = (props: {
  setPopupViewport(v: any): void;
  setViewport(v: any): void;
}) => {
  const [locks, setLocks]: any = React.useState();
  const { meta, coordinates, dispatch } = useGlobalState();
  const { latitude, longitude } = coordinates.center;

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

  React.useEffect(() => {
    firebaseApi.db.openDbConnection({
      lat: latitude,
      lng: longitude,
      setLocks,
      dispatch,
    });
  }, [meta.dbKey]);

  if (!locks) {
    return null;
  }
  return (
    <>
      {Object.entries(locks).map(([key, value]: [key: string, value: ILock]) => {
        const { location, ratings } = value;
        const latAdjustmentPopup = isMobile
          ? 0.0001590001135
          : 0.00015590001135;
        const latAdjustmentViewport = isMobile
          ? 0.00209590001135
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
