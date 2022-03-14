import { useGlobalState } from "../../providers/root";
import { Box, Tag, Switch } from "@chakra-ui/react";
import { isDesktop } from "react-device-detect";
import { CurrentCoordinates } from "../CurrentCoordinates";
import { CenterX } from "./CenterX";
import AbsoluteIconButton from "../../common/AbsoluteIconButton";
import { useHistory } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useModalControlState } from "../../providers/ModalControl";

interface IMapActions {
  newUserOnOpen(): void;
  onOpen(): void;
}

const MapActions = (props: IMapActions) => {
  const { dispatch, coordinates, meta, firebase, user } = useGlobalState();
  const { center } = coordinates;
  const { onOpenNewUser, onOpenAddToMap } = useModalControlState();

  const history = useHistory();

  return (
    <>
      {firebase.isAuthenticated && (
        <AbsoluteIconButton
          onClick={() => {
            if (user.isNew) {
              onOpenNewUser();
            } else {
              history.push("/add");
              onOpenAddToMap();
            }
          }}
          round
          colorScheme="yellow"
          size="sm"
        >
          <AiOutlinePlus fontSize="24px" />
        </AbsoluteIconButton>
      )}
      {coordinates.showCoordinates && <CurrentCoordinates />}
      <CenterX />
      {isDesktop && (
        <Tag
          boxShadow="base"
          borderRadius="100px"
          colorScheme="yellow"
          variant="solid"
          padding={1}
          position="absolute"
          top={meta.isInstalled ? "110px" : "70px"}
          right="10px"
          zIndex="4"
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="center"
          minH="25px"
        >
          <Box pr="2" pl="2">
            Center Marker
          </Box>
          <Switch
            onChange={() =>
              center.showCenter
                ? dispatch({ type: "HIDE_CENTER" })
                : dispatch({ type: "SHOW_CENTER" })
            }
            colorScheme="yellow"
            isChecked={center.showCenter}
            size="md"
          />
        </Tag>
      )}
    </>
  );
};

export default MapActions;
