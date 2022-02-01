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
import { useGlobalState } from "../../providers/root";

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

export const DetailsDrawer = (props: {
  onClose(): void;
  isOpen: boolean;
  title: string;
  location?: {
    city?: string;
    state?: string;
  };
  children: React.ReactNode;
  closeButton: React.ReactNode;
}) => {
  const { meta } = useGlobalState();
  return (
    <Drawer
      placement="right"
      onClose={props.onClose}
      isOpen={props.isOpen}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton marginTop={meta.isInstalled && "60px"} size="lg" />
        <DrawerHeader borderBottomWidth="1px" borderTopWidth="1px">
          <Box>
            {props.title}{" "}
            {props.location?.city &&
              `${props.location?.city}, ${props.location?.state}`}
          </Box>
        </DrawerHeader>
        <DrawerBody padding="0px" margin={meta.isInstalled ? "0px 0px 30px 0px" : "0px"}>{props.children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
