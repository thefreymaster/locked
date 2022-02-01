import {
  Fade,
  Box,
  CloseButton,
  Image,
  Badge,
  Button,
  Divider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import "./users-map.scss";
import RackSize from "./Size";
import RackRecommendation from "./Recommendation";
import Font from "../../common/Font";
import { AiFillStar } from "react-icons/ai";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import StarRating from "../../components/StarRating";
import RackTraffic from "./Traffic";
import { calculateOverallRating } from "../../utils/calcOverallRating";
import ToolTip from "../../common/ToolTip";
import { useGlobalState } from "../../providers/root";
import { Details } from "./Details";
import { isDesktop } from "react-device-detect";

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
  const { firebase } = useGlobalState();

  const canEditDelete =
    firebase.isAuthenticated &&
    firebase.provider &&
    firebase.user?.uid === props.lock?.author;

  console.log(props.lock);

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
      <Image
        minH={props.minH || 275}
        minW={props.minW}
        maxH={props.maxH}
        objectFit="cover"
        bg="red.800"
        color="white"
        loading="eager"
        borderRadius={props.borderRadius}
        name={props.lock.name}
        src={props.lock.imageUrlAbsolute}
      />
      <Box
        position={props.variant === "drawer" ? "fixed" : "inherit"}
        minW="100%"
        bottom="0px"
        backgroundColor="white"
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
            <Badge>
              <Box
                display="flex"
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {/* <Font>Overall</Font> */}
                <AiFillStar color="#FBB03B" fontSize="14px" />
                <Box marginRight="3px" />
                <Font fontSize="14px" fontWeight={900}>
                  {calculateOverallRating({ ratings: props.lock.ratings })}
                </Font>
              </Box>
            </Badge>
          </ToolTip>
        </Box>
        <Divider pt={3} />
        <Box padding="15px 15px 0px 15px">
          <Font
            variant="primary"
            fontSize={24}
            textAlign="center"
            fontWeight="bold"
          >
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
              <Font>Quality</Font>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
            >
              <StarRating overallRating={props.lock.ratings.safety} />
              <Font>Safety</Font>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
            >
              <StarRating overallRating={props.lock.ratings.illumination} />
              <Font>Lighting</Font>
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
            <Box flexGrow={1} />
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
    </>
  );
};
