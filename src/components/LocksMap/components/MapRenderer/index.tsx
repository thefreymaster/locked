import { Box, useDisclosure } from "@chakra-ui/react";
import React from "react";
import LottieLoading from "../../../../common/LottieLoading";
import { useGlobalState } from "../../../../providers/root";
import { generateDbKey } from "../../../../utils/generateDbKey";
import { CurrentCoordinates } from "../../../CurrentCoordinates";
import NewUserModal from "../../../NewUser";
import MapActions from "../../MapActions";
import { CenterX } from "../../CenterX";
import ReactMapboxGl, { Popup } from "react-mapbox-gl";
import RackPopup from "../../Popup";
import { UserLocation } from "../UserLocation/index";
import { RacksRenderer } from "../RacksRenderer";
import { useParams } from "react-router-dom";

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export const MapRenderer = (props) => {
  let initialViewport;
  const { locks, coordinates, dispatch } = useGlobalState();
  const { id }: any = useParams();
  const { onOpen, onClose } = useDisclosure();
  const {
    isOpen: newUserIsOpen,
    onOpen: newUserOnOpen,
    onClose: newUserOnClose,
  } = useDisclosure();

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
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
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
        <MapActions
          setViewport={setViewport}
          viewport={viewport}
          newUserOnOpen={newUserOnOpen}
          onOpen={onOpen}
        />
        <NewUserModal
          isOpen={newUserIsOpen}
          onClose={newUserOnClose}
          onOpenAdd={onOpen}
        />
        <Mapbox
          style="mapbox://styles/thefreymaster/ckke447ga0wla19k1cqupmrrz"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[viewport.longitude, viewport.latitude]}
          zoom={[viewport.zoom]}
          onDragEnd={({ transform }) => {
            const { center } = transform;
            dispatch({
              type: "SET_CENTER_GPS_COORDINATES",
              payload: { latitude: center.lat, longitude: center.lng },
            });
            dispatch({
              type: "SET_DB_KEY",
              payload: {
                dbKey: generateDbKey({ lat: center.lat, lng: center.lng }),
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
      </>
    );
  }, [viewport, popupViewport, lock]);

  return (
    <>
      <CurrentCoordinates />
      <CenterX />
      {MemorizedMap}
    </>
  );
};
