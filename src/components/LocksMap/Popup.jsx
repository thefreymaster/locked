import React from "react";
import { useGlobalState } from "../../providers/root";
import { Fade, Box, useDisclosure, CloseButton } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import "./users-map.scss";
import firebaseApi from "../../api/firebase";
import DeleteRack from "../DeleteRack";
import { DetailsDrawer } from "./Details";
import { RackInformation } from "./RackInformation";
import { isMobile } from "react-device-detect";

const RackPopup = (props) => {
  const { dispatch } = useGlobalState();
  const {
    isOpen: isOpenDetails,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure();

  const { lock } = props;
  const [fadeIn, setFadeIn] = React.useState(false);
  const [isDeleteOpenOpen, setIsOpen] = React.useState(false);
  const history = useHistory();

  React.useLayoutEffect(() => {
    const getUrl = async () => {
      if (lock && lock?.imageUrl) {
        await firebaseApi.getImage({
          fileUrl: lock.imageUrl,
          dispatch,
          id: props.id,
        });
      }
    };
    getUrl();
  }, [lock, lock.imageUrl]);

  const inline = {
    borderRadius: 10,
    minWidth: 320,
    maxWidth: 320,
  };
  React.useLayoutEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 250);
  }, []);
  React.useLayoutEffect(() => {
    if (history.location.pathname.includes("/details")) {
      onOpenDetails();
    }
  }, []);
  return (
    <Fade in={fadeIn}>
      <Box
        flexDir="column"
        maxW="lg"
        key={lock.name}
        style={inline}
        display="flex"
        minH="400px"
      >
        <RackInformation
          id={props.id}
          setIsOpen={setIsOpen}
          setFadeIn={setFadeIn}
          setPopupViewport={props.setPopupViewport}
          setViewport={props.setViewport}
          onOpenDetails={onOpenDetails}
          onOpen={props.onOpen}
          viewport={props.viewport}
          lock={lock}
          borderRadius="10px 10px 0px 0px"
          variant="modal"
        />
        <DeleteRack
          setIsOpen={setIsOpen}
          isOpen={isDeleteOpenOpen}
          id={props.id}
        />
        <DetailsDrawer
          title={lock.name}
          isOpen={isOpenDetails}
          onClose={onCloseDetails}
          closeButton={
            <CloseButton
              position="absolute"
              color="white"
              size="lg"
              onClick={() => {
                props.setFadeIn(false);
                props.setPopupViewport({
                  visible: false,
                  coordinates: [],
                  lock: {},
                });
                props.setViewport({ ...props.viewport, zoom: 15 });
                history.push("/map");
              }}
            />
          }
        >
          <RackInformation
            id={props.id}
            setIsOpen={setIsOpen}
            setFadeIn={setFadeIn}
            setPopupViewport={props.setPopupViewport}
            setViewport={props.setViewport}
            onOpenDetails={onOpenDetails}
            onOpen={props.onOpen}
            viewport={props.viewport}
            lock={lock}
            maxH={
              isMobile
                ? `calc(100vh - ${props.lock.notes ? "304px" : "278px"})`
                : "calc(100vh - 334px)"
            }
            minH={
              isMobile
                ? `calc(100vh - ${props.lock.notes ? "304px" : "278px"})`
                : "calc(100vh - 334px)"
            }
            minW="100%"
            variant="drawer"
          />
        </DetailsDrawer>
      </Box>
    </Fade>
  );
};

export default RackPopup;
