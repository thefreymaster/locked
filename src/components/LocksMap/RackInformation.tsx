import {
  Box,
  CloseButton,
  Image,
  Badge,
  Button,
  Divider,
  Text,
  Spinner,
  ScaleFade,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import "./users-map.scss";
import RackSize from "./Size";
import RackRecommendation from "./Recommendation";
import Font from "../../common/Font";
import { AiFillStar } from "react-icons/ai";
import { IoHappyOutline } from "react-icons/io5";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import StarRating from "../../components/StarRating";
import RackTraffic from "./Traffic";
import { calculateOverallRating } from "../../utils/calcOverallRating";
import ToolTip from "../../common/ToolTip";
import { useGlobalState } from "../../providers/root";
import { Details } from "./Details";
import { isDesktop } from "react-device-detect";
import React from "react";
import { useMapState } from "../../providers/MapContext";
import DeleteRack from "../DeleteRack/index";

export const RackInformation = (props: {
  id: string;
  maxH?: number;
  minW?: number;
  borderRadius?: string;
  minH?: number;
  variant: "drawer" | "modal";
}) => {
  const history = useHistory();
  const { dispatch: mapDispatch, popup, viewport } = useMapState();
  const { firebase, meta } = useGlobalState();
  const { colorMode } = useColorMode();

  const canEditDelete =
    firebase.isAuthenticated &&
    firebase.provider &&
    firebase.user?.uid === popup.lock?.author;

  const [, setIsLoaded] = React.useState(false);
  //delete modal
  const { isOpen, onOpen } = useDisclosure();
  const { onOpen: onOpenDetails } = useDisclosure();

  return (
    <>
      <DeleteRack
        setPopupViewport={() =>
          mapDispatch({
            type: "SET_POPUP",
            payload: {
              visible: false,
              coordinates: [],
              lock: {},
            },
          })
        }
        setIsOpen={onOpen}
        isOpen={isOpen}
        id={props.id}
      />
      {props.variant === "modal" && (
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-end"
          padding="0px"
        >
          <CloseButton
            position="absolute"
            size="lg"
            onClick={() => {
              mapDispatch({
                type: "SET_POPUP",
                payload: {
                  visible: false,
                  coordinates: [],
                  lock: {},
                },
              });
              mapDispatch({
                type: "SET_VIEWPORT",
                payload: { ...viewport, zoom: 15 },
              });
              history.push("/map");
            }}
          />
        </Box>
      )}
      <Image
        minH={props.variant === "modal" ? 275 : props.minH}
        minW={props.variant === "modal" ? "100%" : props.minW}
        maxH={props.maxH}
        objectFit="cover"
        bg="yellow.400"
        loading="lazy"
        borderRadius={props.borderRadius}
        name={popup.lock.name}
        //@ts-ignore
        src={popup.lock?.imageUrlAbsolute}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
      <Box
        position={props.variant === "drawer" ? "fixed" : "inherit"}
        minW="100%"
        bottom="0px"
        backgroundColor={colorMode === "light" ? "white" : "#1a212f"}
        paddingBottom={
          meta.isInstalled && props.variant === "drawer" ? "80px" : "0px"
        }
      >
        <Box
          display="flex"
          flexDirection="row"
          padding="15px 15px 0px 15px"
          justifyContent="center"
          alignItems="center"
        >
          <RackRecommendation
            recommended={popup.lock.recommended}
            variant={props.variant}
          />
          <RackSize size={popup.lock.size} variant={props.variant} />
          <RackTraffic traffic={popup.lock.traffic} variant={props.variant} />
          <ToolTip label="Overall Rating">
            <Badge
              minH="25px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                display="flex"
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <AiFillStar color="#FBB03B" fontSize="14px" />
                <Box marginRight="3px" />
                <Font fontSize="14px" fontWeight={900}>
                  {calculateOverallRating({ ratings: popup.lock.ratings })}
                </Font>
              </Box>
            </Badge>
          </ToolTip>
          {canEditDelete && (
            <ToolTip label="Added by you!">
              <Badge variant="subtle" marginLeft="2" minH="25px">
                <Box
                  display="flex"
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  padding="3.5px"
                >
                  <IoHappyOutline color="#000" fontSize="14px" />
                </Box>
              </Badge>
            </ToolTip>
          )}
        </Box>
        <Divider pt={3} />
        <Box padding="15px 15px 0px 15px">
          <Font fontSize={24} textAlign="center" fontWeight="bold">
            {popup.lock.name}
          </Font>
          {/* //@ts-ignore */}
          <Text textAlign="center">{popup.lock?.notes}</Text>
          <Box
            display="flex"
            direction="row"
            alignItems="flex-start"
            marginTop={4}
          >
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
            >
              <StarRating overallRating={popup.lock.ratings.quality} />
              <Font fontWeight="bold">Quality</Font>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
            >
              <StarRating overallRating={popup.lock.ratings.safety} />
              <Font fontWeight="bold">Safety</Font>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
            >
              <StarRating overallRating={popup.lock.ratings.illumination} />
              <Font fontWeight="bold">Lighting</Font>
            </Box>
            {/* {lock.traffic && lock.traffic !== 'medium' && (
                <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" flexGrow={1}>
                    {
                        lock.traffic === 'high' ? <BsGraphDown /> : <BsGraphUp />
                    }
                    <Font>Traffic</Font>
                </Box>
            )} */}
          </Box>
          {props.variant === "drawer" && isDesktop && (
            <Details lock={popup.lock} />
          )}
        </Box>
        <Box pt={3}>
          <Divider borderColor={colorMode === "light" ? "white" : "#1c374a"} />
        </Box>
        {canEditDelete && (
          <Box width="100%" display="flex" justifyContent="flex-end">
            <Button
              colorScheme="red"
              margin="2"
              marginRight="0"
              size="sm"
              onClick={onOpen}
            >
              Remove
            </Button>
            <Box flexGrow={1} />
            <Button
              colorScheme="gray"
              margin="2"
              size="sm"
              onClick={() => {
                history.push(`/edit/${props.id}`);
                onOpen();
              }}
            >
              Edit
            </Button>
            {props.variant === "modal" && (
              <Button
                margin="2"
                marginLeft="1"
                size="sm"
                colorScheme="gray"
                onClick={() => {
                  history.push(`/details/${props.id}`);
                  onOpenDetails();
                }}
              >
                Details
              </Button>
            )}
          </Box>
        )}

        {props.variant === "modal" && !canEditDelete && (
          <Box width="100%" display="flex" justifyContent="flex-end">
            <Box flexGrow={1} />
            <Button
              colorScheme="gray"
              margin="2"
              marginLeft="1"
              size="sm"
              onClick={() => {
                history.push(`/details/${props.id}`);
                onOpenDetails();
              }}
            >
              Details
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};
