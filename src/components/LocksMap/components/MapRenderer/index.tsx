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

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export const MapDataGetter = () => {
  const [lock, setLock] = React.useState();
  const { meta } = useGlobalState();
  const { id }: any = useParams();

  React.useLayoutEffect(() => {
    const getItem = async () => {
      await firebaseApi.db.openSingleItmeDbConnection({
        dbKey: meta.dbKey,
        id,
        setLock,
      });
    };
    if (id) {
      getItem();
    }
  }, [id, meta.dbKey]);

  return <MapRenderer id={id} lock={lock} />;
};

export const MapRenderer = (props: { id: any; lock: any }) => {
  const { colorMode } = useColorMode();
  const { coordinates, dispatch } = useGlobalState();
  const { onOpen, onClose } = useDisclosure();
  const { onOpen: newUserOnOpen } = useDisclosure();
  const [viewport, setViewport] = React.useState(
    props.id
      ? {
          width: window.innerWidth,
          height: window.innerHeight,
          latitude:
            props.lock?.location?.lat ??
            coordinates.center?.latitude,
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

  const [popupViewport, setPopupViewport] = React.useState({
    visible: props.id ? true : false,
    coordinates: props.lock
      ? [props.lock.location.long, props.lock.location.lat + 0.00009590001135]
      : [],
    lock: props.lock || {},
    id: props.id,
  });

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
            setViewport({
              ...viewport,
              zoom,
              latitude: center.lat,
              longitude: center.lng,
            });
          }}
        >
          <RacksRenderer
            setViewport={setViewport}
            setPopupViewport={setPopupViewport}
          />
          {popupViewport.visible && popupViewport?.coordinates?.length > 0 && (
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
  }, [viewport, popupViewport, props.lock, colorMode]);

  return <>{MemorizedMap}</>;
};
