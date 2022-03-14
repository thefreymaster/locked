import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  Tag,
} from "@chakra-ui/react";
import { ILock } from "../../interfaces/ILock";
import { useMapState } from "../../providers/MapContext";
import { useGlobalState } from "../../providers/root";
import { isDrawerNotVisible } from "../../actions/index";
import { useHistory, useParams } from "react-router-dom";

export const Details = (props: { lock: ILock }) => {
  return (
    <Box padding="4" display="flex" alignItems="center" justifyContent="center">
      <Tag>
        Created On: {new Date(props.lock.createdDate).toLocaleDateString()}
      </Tag>
      <Box flexGrow={1} />
      <Tag>Lat: {props.lock.location?.lat}</Tag>
      <Box flexGrow={1} />
      <Tag>Long: {props.lock.location?.long}</Tag>
    </Box>
  );
};

export const DetailsDrawer = (props: { children: React.ReactNode }) => {
  const history = useHistory();
  const { id }: { id: string } = useParams();
  const { meta } = useGlobalState();
  const { popup, drawer, dispatch: mapDispatch } = useMapState();

  return (
    <Drawer
      placement="right"
      onClose={() => {
        mapDispatch(isDrawerNotVisible);
        history.push(`/map/${id}`);
      }}
      isOpen={drawer.visible}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton marginTop={meta.isInstalled && "50px"} size="lg" />
        <DrawerHeader
          borderBottomWidth="1px"
          borderTopWidth="1px"
          paddingTop={meta.isInstalled ? "60px" : "16px"}
        >
          <Box>{popup.lock.name}</Box>
        </DrawerHeader>
        <DrawerBody
          padding="0px"
          margin={meta.isInstalled ? "0px 0px 30px 0px" : "0px"}
        >
          {props.children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
