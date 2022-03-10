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

export const RackInformation = (props: {
  setFadeIn(v: boolean): void;
  setPopupViewport: any;
  setViewport: any;
  setIsOpen: any;
  onOpen: any;
  onOpenDetails: any;
  lock: any;
  viewport: any;
  id: string;
  maxH?: number;
  minW?: number;
  borderRadius?: number;
  minH?: number;
  variant: "drawer" | "modal";
}) => {
  const history = useHistory();
  const { firebase, meta } = useGlobalState();

  const canEditDelete =
    firebase.isAuthenticated &&
    firebase.provider &&
    firebase.user?.uid === props.lock?.author;

  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <>
      {props.variant === "modal" && (
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-end"
          padding="0px"
        >
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
        </Box>
      )}
      {/* <ScaleFade initialScale={0.9} in={isLoaded}> */}
      <Image
        minH={props.variant === "modal" ? 275 : props.minH}
        minW={props.variant === "modal" ? "100%" : props.minW}
        maxH={props.maxH}
        objectFit="cover"
        bg="yellow.400"
        color="white"
        loading="lazy"
        borderRadius={props.borderRadius}
        name={props.lock.name}
        src={props.lock.imageUrlAbsolute}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
      {/* </ScaleFade> */}
      <Box
        position={props.variant === "drawer" ? "fixed" : "inherit"}
        minW="100%"
        bottom="0px"
        paddingBottom={
          meta.isInstalled && props.variant === "drawer" ? "80px" : "0px"
        }
        backgroundColor="white"
        borderRadius={props.variant === "modal" ? "10px" : "0px"}
      >
        <Box
          display="flex"
          flexDirection="row"
          padding="15px 15px 0px 15px"
          justifyContent="center"
          alignItems="center"
        >
          <RackRecommendation
            recommended={props.lock.recommended}
            variant={props.variant}
          />
          <RackSize size={props.lock.size} variant={props.variant} />
          <RackTraffic traffic={props.lock.traffic} variant={props.variant} />
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
                  {calculateOverallRating({ ratings: props.lock.ratings })}
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
            {props.lock.name}
          </Font>
          <Text textAlign="center">{props.lock.notes}</Text>
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
              <StarRating overallRating={props.lock.ratings.quality} />
              <Font fontWeight="bold">Quality</Font>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
            >
              <StarRating overallRating={props.lock.ratings.safety} />
              <Font fontWeight="bold">Safety</Font>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
            >
              <StarRating overallRating={props.lock.ratings.illumination} />
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
            <Details lock={props.lock} />
          )}
        </Box>
        <Box pt={3}>
          <Divider />
        </Box>
        {canEditDelete && (
          <Box width="100%" display="flex" justifyContent="flex-end">
            <Button
              colorScheme="red"
              margin="2"
              marginRight="0"
              size="sm"
              icon={<BiTrash />}
              onClick={() => props.setIsOpen(true)}
            >
              Remove
            </Button>
            <Box flexGrow={1} />
            <Button
              colorScheme="gray"
              margin="2"
              size="sm"
              icon={<BiEditAlt />}
              onClick={() => {
                history.push(`/edit/${props.id}`);
                props.onOpen();
              }}
            >
              Edit
            </Button>
            {props.variant === "modal" && (
              <Button
                colorScheme="gray"
                margin="2"
                marginLeft="1"
                size="sm"
                icon={<BiEditAlt />}
                onClick={() => {
                  history.push(`/details/${props.id}`);
                  props.onOpenDetails();
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
              icon={<BiEditAlt />}
              onClick={() => {
                history.push(`/details/${props.id}`);
                props.onOpenDetails();
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
