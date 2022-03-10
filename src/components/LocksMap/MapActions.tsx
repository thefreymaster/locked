import { useGlobalState } from "../../providers/root";
import { Box, Tag, Switch } from "@chakra-ui/react";
import { isDesktop } from "react-device-detect";
import { CurrentCoordinates } from "../CurrentCoordinates";
import { CenterX } from "./CenterX";
import AbsoluteButton from "../../common/AbsoluteButton";
import { useHistory } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { useModalControlState } from "../../providers/ModalControl";

interface IMapActions {
  setViewport(viewPort: any): void;
  viewport: any;
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
        <AbsoluteButton
          colorScheme="yellow"
          onClick={() => {
            if (user.isNew) {
              onOpenNewUser();
            } else {
              history.push("/add");
              onOpenAddToMap();
            }
          }}
        >
          <FiPlusCircle />
        </AbsoluteButton>
      )}
      {coordinates.showCoordinates && <CurrentCoordinates />}
      <CenterX />
      {isDesktop && (
        <Tag
          boxShadow="base"
          borderRadius="md"
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
