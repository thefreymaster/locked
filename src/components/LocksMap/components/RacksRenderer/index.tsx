import { useHistory, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { calculateOverallRating } from "../../../../utils/calcOverallRating";
import { Marker } from "react-mapbox-gl";
import { Fade } from "@chakra-ui/react";
import BikeRackMarker from "../../BikeRackMarker";
import React from "react";
import firebaseApi from "../../../../api/firebase";
import { useGlobalState } from "../../../../providers/root";
import { ILock } from "../../../../interfaces/ILock";
import { useMapState } from "../../../../providers/MapContext";

const latAdjustmentPopup = isMobile ? 0.0001590001135 : 0.00015590001135;
const latAdjustmentViewport = isMobile ? 0.00209590001135 : 0.00199590001135;

export const RacksRenderer = () => {
  const [locks, setLocks]: any = React.useState();
  const params: { id: string } = useParams();
  const { dispatch: mapDispatch } = useMapState();
  const { meta, coordinates, dispatch } = useGlobalState();
  const { latitude, longitude } = coordinates.center;

  const history = useHistory();

  const handleClick = (value: any, key: string) => {
    mapDispatch({
      type: "SET_POPUP",
      payload: {
        visible: true,
        coordinates: [
          value.location.long,
          value.location.lat + latAdjustmentPopup,
        ],
        lock: value,
        id: key,
      },
    });
    mapDispatch({
      type: "SET_VIEWPORT",
      payload: {
        zoom: 16,
        latitude: value.location.lat + latAdjustmentViewport,
        longitude: value.location.long,
      },
    });
    history.push(`/map/${key}/${value.location.lat}/${value.location.long}`);
  };

  React.useEffect(() => {
    firebaseApi.db.openDbConnection({
      lat: latitude,
      lng: longitude,
      setLocks,
      dispatch,
    });
  }, [meta.dbKey]);

  React.useEffect(() => {
    if (locks && params?.id) {
      try {
        const [,item] = Object.entries(locks).find(
          ([key, value]: [key: string, value: ILock]) => key === params?.id
        );
        handleClick(
          item,
          params?.id
        );
      } catch (error) {
        console.error(error);
      }

    }
  }, [params?.id, locks]);

  if (!locks) {
    return null;
  }
  return (
    <>
      {Object.entries(locks).map(
        ([key, value]: [key: string, value: ILock]) => {
          const { location, ratings } = value;
          const overallRating = calculateOverallRating({ ratings });
          return (
            <Marker
              onClick={() => handleClick(value, key)}
              key={`friend-marker-${key}`}
              coordinates={[location.long, location.lat]}
              className="rack-marker"
            >
              <Fade in>
                <BikeRackMarker overallRating={overallRating} />
              </Fade>
            </Marker>
          );
        }
      )}
    </>
  );
};
