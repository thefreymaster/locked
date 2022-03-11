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

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export const MapRenderer = (props) => {
  const { colorMode } = useColorMode();
  let initialViewport;
  const { locks, coordinates, dispatch } = useGlobalState();
  const { id }: any = useParams();
  const { onOpen, onClose } = useDisclosure();
  const { onOpen: newUserOnOpen } = useDisclosure();

  const lock: any = locks?.[id];

  if (props.id) {
    initialViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: lock.location!.lat + 0.00061000001135,
      longitude: lock.location!.long,
      zoom: 18,
    };
  } else {
    initialViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: coordinates.center?.latitude ?? coordinates.latitude,
      longitude: coordinates.center?.longitude ?? coordinates.longitude,
      zoom: 15,
    };
  }

  const [viewport, setViewport] = React.useState({ ...initialViewport });
  const [popupViewport, setPopupViewport] = React.useState({
    visible: props.id ? true : false,
    coordinates: lock
      ? [lock.location.long, lock.location.lat + 0.00009590001135]
      : [],
    lock: lock || {},
    id: props.id,
  });

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
          style={
            colorMode === 'light'
              ? "mapbox://styles/thefreymaster/ckke447ga0wla19k1cqupmrrz"
              : "mapbox://styles/thefreymaster/ckz2wubzy000714ox0su8us49"
          }
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[viewport.longitude, viewport.latitude]}
          zoom={[viewport.zoom]}
          onDragEnd={(mapEnd) => {
            const { center } = mapEnd?.transform;
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
          }}
        >
          <RacksRenderer
            setViewport={setViewport}
            setPopupViewport={setPopupViewport}
          />
          {popupViewport.visible && (
            <Popup
              anchor="bottom"
              coordinates={popupViewport.coordinates}
              offset={8}
            >
              <RackPopup
                setViewport={setViewport}
                viewport={viewport}
                setPopupViewport={setPopupViewport}
                id={popupViewport.id}
                lock={lock}
                onOpen={onOpen}
                onClose={onClose}
              />
            </Popup>
          )}
          <UserLocation coordinates={coordinates} />
        </Mapbox>
        <MapActions
          setViewport={setViewport}
          viewport={viewport}
          newUserOnOpen={newUserOnOpen}
          onOpen={onOpen}
        />
        <NewUserModal />
      </>
    );
  }, [viewport, popupViewport, lock, colorMode]);

  return <>{MemorizedMap}</>;
};
