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
import React from "react";
import { GiSpikedFence, GiWoodenSign, GiPineTree } from "react-icons/gi";
import firebaseApi from "../../api/firebase";
import { useGlobalState } from "../../providers/root";
import BICYCLE from "../../assets/bicycle.svg";
import { isMobile } from "react-device-detect";

const NewUserModal = (props: {
  isOpen: boolean;
  onClose(): void;
  onOpenAdd(): void;
}) => {
  const { firebase } = useGlobalState();
  const { user } = firebase;
  const circle = {
    width: 100,
    height: 100,
    borderRadius: 100,
    border: "10px solid #F56565",
  };
  const cross = {
    border: "4px solid #F56565",
    backgroundColor: "#F56565",
    width: 96,
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bike racks only please!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="1rem">No fences, signs, poles or trees</Text>
          <Box display="flex" flexDir="row" justifyContent="center">
            {/* <img src={BICYCLE} alt="bicycle" /> */}
            <Box
              transform={
                isMobile
                  ? "translateY(45px) translateX(-114px) rotate(45deg)"
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
                transform: isMobile
                  ? "translateY(45px) translateX(0px) rotate(45deg)"
                  : "translateY(45px) translateX(0px) rotate(45deg)",
              }}
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
              <GiWoodenSign size={60} color="#B7791F" />
            </Box>
            <Box flexGrow={1} />
            <Box
              style={{
                ...cross,
                transform: isMobile
                  ? "translateY(45px) translateX(114px) rotate(45deg)"
                  : "translateY(45px) translateX(153px) rotate(45deg)",
              }}
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
          <Button variant="ghost" onClick={props.onClose} mr={2}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onClose();
              // @ts-ignore
              firebaseApi.auth.oldUser({ uid: user!.uid });
              props.onOpenAdd();
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
