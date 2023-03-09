import {
  Box,
  CloseButton,
  Image,
  Badge,
  useClipboard,
  Divider,
  Text,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import "./users-map.scss";
import RackSize from "./Size";
import RackRecommendation from "./Recommendation";
import Font from "../../common/Font";
import { AiFillStar, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoCopy, IoHappyOutline } from "react-icons/io5";
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
import { isDrawerVisible } from "../../actions/index";
import { MdInfo, MdContentCopy, MdCheck } from "react-icons/md";
import { IoNavigateCircle } from "react-icons/io5";

export const RackInformation = (props: {
  id: string;
  maxH?: string;
  minW?: string;
  borderRadius?: string;
  minH?: string;
  variant: "drawer" | "modal";
}) => {
  const history = useHistory();
  const { onCopy, value, hasCopied } = useClipboard(window.location.href);
  const { dispatch: mapDispatch, popup, viewport } = useMapState();
  const { firebase, meta, coordinates } = useGlobalState();
  const { colorMode } = useColorMode();

  console.log(value);

  const canEditDelete =
    firebase.isAuthenticated &&
    firebase.provider &&
    firebase.user?.uid === popup.lock?.author;

  const [, setIsLoaded] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

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
        setIsOpen={setIsOpen}
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
        minH={props.variant === "modal" ? 200 : props.minH}
        minW={props.variant === "modal" ? "100%" : props.minW}
        maxH={props.maxH}
        objectFit="cover"
        bg="yellow.400"
        loading="lazy"
        borderRadius={props.borderRadius}
        // name={popup.lock.name}
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
            recommended={
              calculateOverallRating({ ratings: popup.lock.ratings }) > 3.5
            }
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
                flexDirection="row"
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
                  flexDirection="row"
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
          <Text textAlign="center">{popup.lock?.notes}</Text>
          <Box
            display="flex"
            flexDirection="row"
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
          </Box>
          {props.variant === "drawer" && isDesktop && (
            <Details lock={popup.lock} />
          )}
        </Box>
        <Box pt={3}>
          <Divider borderColor={colorMode === "light" ? "white" : "#1c374a"} />
        </Box>

        <Box
          width="100%"
          display="flex"
          gap="2"
          padding="2"
          justifyContent="flex-end"
        >
          {canEditDelete && (
            <>
              <ToolTip label="Remove" placement="bottom">
                <IconButton
                  aria-label="remove"
                  colorScheme="red"
                  marginRight="0"
                  size="sm"
                  onClick={() => setIsOpen(true)}
                >
                  <AiOutlineDelete />
                </IconButton>
              </ToolTip>
              <ToolTip label="Edit" placement="bottom">
                <IconButton
                  aria-label="edit"
                  colorScheme="gray"
                  size="sm"
                  onClick={() => {
                    history.push(`/edit/${popup?.id}`);
                  }}
                >
                  <AiOutlineEdit />
                </IconButton>
              </ToolTip>
              <Box flexGrow={1} />
            </>
          )}
          <ToolTip label="Copy Link" placement="bottom">
            <IconButton
              aria-label="copy"
              colorScheme="gray"
              size="sm"
              onClick={() => onCopy()}
            >
              {hasCopied ? <MdCheck /> : <MdContentCopy />}
            </IconButton>
          </ToolTip>
          <ToolTip label="Directions" placement="bottom">
            <IconButton
              aria-label="directions"
              colorScheme="gray"
              size="sm"
              as="a"
              target="_blank"
              href={`https://www.google.com/maps/dir/${coordinates.live.latitude},${coordinates.live.longitude}/${popup.lock.location.lat}, ${popup.lock.location.long}`}
            >
              <IoNavigateCircle />
            </IconButton>
          </ToolTip>
          {props.variant === "modal" && (
            <ToolTip label="Details" placement="bottom">
              <IconButton
                aria-label="details"
                size="sm"
                colorScheme="gray"
                onClick={() => {
                  history.push(`/details/${props.id}`);
                  mapDispatch(isDrawerVisible);
                }}
              >
                <MdInfo />
              </IconButton>
            </ToolTip>
          )}
        </Box>
      </Box>
    </>
  );
};
