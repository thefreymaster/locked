import React from "react";
import { Fade, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "./users-map.scss";
import { DetailsDrawer } from "./Details";
import { RackInformation } from "./RackInformation";
import { useMapState } from "../../providers/MapContext";
import firebaseApi from "../../api/firebase";
import { useGlobalState } from "../../providers/root";

const RackPopup = () => {
  const ref = React.useRef();
  const { meta } = useGlobalState();
  const { id }: any = useParams();
  const { popup, dispatch: mapDispatch } = useMapState();

  React.useLayoutEffect(() => {
    const getUrl = async () => {
      if (popup?.lock && popup?.lock?.imageUrl) {
        await firebaseApi.getImage({
          fileUrl: popup?.lock?.imageUrl,
          lock: popup?.lock,
          mapDispatch,
        });
      }
    };
    getUrl();
  }, [popup.lock, popup.lock?.imageUrl]);

  return (
    <Fade in>
      <Box
        ref={ref}
        flexDir="column"
        maxW="lg"
        key={popup.lock.name}
        style={{
          borderRadius: 10,
          minWidth: 320,
          maxWidth: 320,
        }}
        display="flex"
        minH="400px"
        borderRadius="10px"
        zIndex={10000}
      >
        <RackInformation
          id={id}
          borderRadius="10px 10px 0px 0px"
          variant="modal"
        />
      </Box>
      <DetailsDrawer>
        <RackInformation
          id={id}
          borderRadius="0px"
          variant="drawer"
          minH="100%"
          minW="100%"
        />
      </DetailsDrawer>
    </Fade>
  );

  // const ref = React.useRef();
  // const [lock, setLock] = React.useState();
  // const { meta } = useGlobalState();
  // const {
  //   isOpen: isOpenDetails,
  //   onOpen: onOpenDetails,
  //   onClose: onCloseDetails,
  // } = useDisclosure();
  // useOutsideClick({
  //   ref: ref,
  //   handler: () => onCloseDetails(false),
  // });

  // const [fadeIn, setFadeIn] = React.useState(false);
  // const [isDeleteOpenOpen, setIsOpen] = React.useState(false);
  // const history = useHistory();

  // React.useLayoutEffect(() => {
  //   const getUrl = async () => {
  //     if (lock && lock?.imageUrl) {
  //       await firebaseApi.getImage({
  //         fileUrl: lock.imageUrl,
  //         lock,
  //         setLock,
  //       });
  //     }
  //   };
  //   getUrl();
  // }, [lock, lock?.imageUrl]);

  // React.useEffect(() => {
  //   firebaseApi.db.openSingleItmeDbConnection({
  //     dbKey: meta.dbKey,
  //     id: props.id,
  //     setLock: setLock,
  //   });
  // }, []);

  // React.useLayoutEffect(() => {
  //   setTimeout(() => {
  //     setFadeIn(true);
  //   }, 250);
  // }, []);
  // React.useLayoutEffect(() => {
  //   if (history.location.pathname.includes("/details")) {
  //     onOpenDetails();
  //   }
  // }, []);

  // const calculateHeight = () => {
  //   if (isMobile) {
  //     return `100%`;
  //   }
  //   return `100%`;
  // };

  // return (
  // <Fade in={fadeIn}>
  //   <Box
  //     ref={ref}
  //     flexDir="column"
  //     maxW="lg"
  //     key={lock.name}
  //     style={inline}
  //     display="flex"
  //     minH="400px"
  //     borderRadius="10px"
  //     zIndex={10000}
  //   >
  // <RackInformation
  //   id={props.id}
  //   setIsOpen={setIsOpen}
  //   setFadeIn={setFadeIn}
  //   setPopupViewport={props.setPopupViewport}
  //   setViewport={props.setViewport}
  //   onOpenDetails={onOpenDetails}
  //   onOpen={props.onOpen}
  //   viewport={props.viewport}
  //   lock={lock}
  //   borderRadius="10px 10px 0px 0px"
  //   variant="modal"
  // />
  // <DeleteRack
  //   setPopupViewport={props.setPopupViewport}
  //   setIsOpen={setIsOpen}
  //   isOpen={isDeleteOpenOpen}
  //   id={props.id}
  // />
  // <DetailsDrawer
  //   title={lock.name}
  //   location={lock.location}
  //   isOpen={isOpenDetails}
  //   onClose={onCloseDetails}
  //   closeButton={
  //     <CloseButton
  //       position="absolute"
  //       color="white"
  //       size="lg"
  //       onClick={() => {
  //         props.setFadeIn(false);
  //         props.setPopupViewport({
  //           visible: false,
  //           coordinates: [],
  //           lock: {},
  //         });
  //         props.setViewport({ ...props.viewport, zoom: 15 });
  //         history.push("/map");
  //       }}
  //     />
  //   }
  // >
  //   <RackInformation
  //     id={props.id}
  //     setIsOpen={setIsOpen}
  //     setFadeIn={setFadeIn}
  //     setPopupViewport={props.setPopupViewport}
  //     setViewport={props.setViewport}
  //     onOpenDetails={onOpenDetails}
  //     onOpen={props.onOpen}
  //     viewport={props.viewport}
  //     lock={lock}
  // minH={calculateHeight}
  // minW="100%"
  //     variant="drawer"
  //   />
  // </DetailsDrawer>
  //     </Box>
  //   </Fade>
  // );
};

export default RackPopup;
