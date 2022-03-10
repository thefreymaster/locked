import { Box, useDisclosure } from "@chakra-ui/react";
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
import AbsoluteButton from "../../../../common/AbsoluteButton";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import { calcIsSupportedLocation } from "../../../../utils/calcIsSupportedLocation";

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export const MapRenderer = (props) => {
  let initialViewport;
  const { locks, coordinates, dispatch } = useGlobalState();
  const { center } = coordinates;
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

  const handleZoomUp = () => {
    setViewport({
      ...viewport,
      latitude: center?.latitude,
      longitude: center?.longitude,
      zoom: viewport.zoom + 1,
    });
  };

  const handleZoomDown = () => {
    setViewport({
      ...viewport,
      latitude: center?.latitude,
      longitude: center?.longitude,
      zoom: viewport.zoom - 1,
    });
  };

  const handleIsSupported = (center: any, dbKey: string) => {
    calcIsSupportedLocation(dispatch, parseInt(dbKey));
  };

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
        <NewUserModal />
        <Mapbox
          style="mapbox://styles/thefreymaster/ckke447ga0wla19k1cqupmrrz"
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
        {/* <AbsoluteButton
          borderRadius="100px"
          minHeight="45px"
          minWidth="45px"
          padding="0px"
          fontSize="20px"
          left={20}
          right="none"
          bottom={70}
          onClick={handleZoomUp}
        >
          <CgMathPlus />
        </AbsoluteButton>
        <AbsoluteButton
          borderRadius="100px"
          minHeight="45px"
          minWidth="45px"
          padding="0px"
          fontSize="20px"
          left={20}
          right="none"
          onClick={handleZoomDown}
        >
          <CgMathMinus />
        </AbsoluteButton> */}
      </>
    );
  }, [viewport, popupViewport, lock]);

  return <>{MemorizedMap}</>;
};
