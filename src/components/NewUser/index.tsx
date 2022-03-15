import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { GiSpikedFence, GiWoodenSign, GiPineTree } from "react-icons/gi";
import firebaseApi from "../../api/firebase";
import { useGlobalState } from "../../providers/root";
import { isMobile } from "react-device-detect";
import { useModalControlState } from "../../providers/ModalControl";
import { useHistory } from "react-router-dom";

const NewUserModal = () => {
  const { isOpenNewUser, onCloseNewUser, onOpenAddToMap } =
    useModalControlState();
  const { firebase } = useGlobalState();
  const history = useHistory();
  const { user } = firebase;
  const circle = {
    width: 100,
    height: 100,
    borderRadius: 100,
    border: "10px solid #F56565",
  };
  const cross = {
    borderRadius: 10,
    border: "4px solid #F56565",
    backgroundColor: "#F56565",
    maxWidth: "90px",
    minWidth: "90px",
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpenNewUser}
      onClose={onCloseNewUser}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bike racks only please!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="1rem">No fences, signs, poles or trees</Text>
          <Box display="flex" flexDir="row" justifyContent="center">
            <Box
              transform={
                isMobile
                  ? "translateY(45px) translateX(-117px) rotate(45deg)"
                  : "translateY(45px) translateX(-152px) rotate(45deg)"
              }
              position="absolute"
              {...cross}
            />
            <Box
              p={5}
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              style={circle}
            >
              <GiSpikedFence size={60} color="#4A5568" />
            </Box>
            <Box flexGrow={1} />
            <Box
              style={{
                position: 'absolute',
                transform: isMobile
                  ? "translateY(45px) translateX(0px) rotate(45deg)"
                  : "translateY(45px) translateX(0px) rotate(45deg)",
              }}
              {...cross}
            />
            <Box
              p={5}
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              style={circle}
            >
              <GiWoodenSign size={60} color="#B7791F" />
            </Box>
            <Box flexGrow={1} />
            <Box
              style={{
                position: 'absolute',
                transform: isMobile
                  ? "translateY(45px) translateX(120px) rotate(45deg)"
                  : "translateY(45px) translateX(151px) rotate(45deg)",
              }}
              {...cross}
            />
            <Box
              p={5}
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              style={circle}
            >
              <GiPineTree size={60} color="#48BB78" />
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onCloseNewUser} mr={2}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onCloseNewUser();
              // @ts-ignore
              firebaseApi.auth.oldUser({ uid: user!.uid });
              history.push("/add");
              onOpenAddToMap();
            }}
          >
            Let's roll
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewUserModal;
