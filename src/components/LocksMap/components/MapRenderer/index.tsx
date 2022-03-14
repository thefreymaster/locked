import { Box, useColorMode, useDisclosure } from "@chakra-ui/react";
import React from "react";
import LottieLoading from "../../../../common/LottieLoading";
import { useGlobalState } from "../../../../providers/root";
import { generateDbKey } from "../../../../utils/generateDbKey";
import NewUserModal from "../../../NewUser";
import MapActions from "../../MapActions";
import ReactMapboxGl, { Popup } from "react-mapbox-gl";
import RackPopup from "../../Popup";
import { UserLocation } from "../UserLocation/index";
import { RacksRenderer } from "../RacksRenderer";
import { useParams } from "react-router-dom";
import firebaseApi from "../../../../api/firebase";
import {
  Provider as MapProvider,
  useMapState,
} from "../../../../providers/MapContext";
import { PopupRenderer } from "../PopupRenderer";

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export const MapDataGetter = () => {
  const [lock, setLock] = React.useState();
  const { meta, coordinates } = useGlobalState();
  const { id }: any = useParams();

  return (
    <MapProvider
      latidude={coordinates.center?.latitude}
      longitude={coordinates.center?.longitude}
    >
      <MapRenderer id={id} lock={lock} />
    </MapProvider>
  );
};

export const MapRenderer = (props: { id: any; lock: any }) => {
  const { colorMode } = useColorMode();
  const { viewport, dispatch: mapDispatch } = useMapState();

  const { coordinates, dispatch } = useGlobalState();
  const { onOpen } = useDisclosure();
  const { onOpen: newUserOnOpen } = useDisclosure();
  const [, setViewport] = React.useState(
    props.id
      ? {
          width: window.innerWidth,
          height: window.innerHeight,
          latitude: props.lock?.location?.lat ?? coordinates.center?.latitude,
          longitude:
            props.lock?.location?.long ?? coordinates.center?.longitude,
          zoom: 18,
        }
      : {
          width: window.innerWidth,
          height: window.innerHeight,
          latitude: coordinates.center?.latitude,
          longitude: coordinates.center?.longitude,
          zoom: 15,
        }
  );

  const DAY_MAP = "mapbox://styles/thefreymaster/ckke447ga0wla19k1cqupmrrz";
  const NIGHT_MAP = "mapbox://styles/thefreymaster/ckz2wubzy000714ox0su8us49";

  const MemorizedMap = React.useMemo(() => {
    if (!viewport) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <LottieLoading />
        </Box>
      );
    }
    return (
      <>
        <Mapbox
          style={colorMode === "light" ? DAY_MAP : NIGHT_MAP}
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[viewport.longitude, viewport.latitude]}
          zoom={[viewport.zoom]}
          onDragEnd={(mapEnd) => {
            const { center, zoom } = mapEnd?.transform;
            const dbKey = generateDbKey({ lat: center.lat, lng: center.lng });
            dispatch({
              type: "SET_CENTER_GPS_COORDINATES",
              payload: { latitude: center.lat, longitude: center.lng },
            });
            dispatch({
              type: "SET_DB_KEY",
              payload: {
                dbKey,
              },
            });
            mapDispatch({
              type: "SET_VIEWPORT",
              payload: {
                ...viewport,
                zoom,
                latitude: center.lat,
                longitude: center.lng,
              },
            });
          }}
        >
          <>
            <RacksRenderer />
            <PopupRenderer />
            <UserLocation coordinates={coordinates} />
          </>
        </Mapbox>
        <MapActions
          newUserOnOpen={newUserOnOpen}
          onOpen={onOpen}
        />
        <NewUserModal />
      </>
    );
  }, [viewport, colorMode]);

  return <>{MemorizedMap}</>;
};
