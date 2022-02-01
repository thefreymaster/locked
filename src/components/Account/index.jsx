import {
  Box,
  Button,
  Divider,
  SlideFade,
  Spinner,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import firebaseApi from "../../api/firebase";
import Font from "../../common/Font";
import Wrapper from "../../common/Wrapper";
import { BLUE } from "../../constants";
import { useGlobalState } from "../../providers/root";
import Authenticated from "../Authenticated";
import { useHistory } from "react-router-dom";
import LottieLoading from "../../common/LottieLoading";
import { changeLog } from "../../json/changeLog";
import DeviceWrapper from "../../common/DeviceWrapper";

const Account = () => {
  const { dispatch, firebase, meta } = useGlobalState();
  const { isOpen, onToggle } = useDisclosure();
  const history = useHistory();

  const toast = useToast();

  const showSuccessToast = () => {
    toast({
      title: "Authenticated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const showInfoToast = () => {
    toast({
      title: "See ya!",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  React.useEffect(() => {
    onToggle();
  }, []);

  if (firebase.isValidatingAuthentication || meta.fetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <LottieLoading />
      </Box>
    );
  }
  return (
    <Wrapper justifyContent="flex-start">
      <DeviceWrapper>
        <Box
          width="100%"
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
        >
          <Text fontWeight={900} fontSize={32}>
            Settings
          </Text>
          <Box borderRadius="lg" boxShadow="md" padding={4} minW="100%">
            <Box margin="15px">
              {firebase.isAuthenticated ? (
                <Authenticated />
              ) : (
                <Button
                  onClick={() =>
                    firebaseApi.auth.signIn(dispatch, showSuccessToast)
                  }
                >
                  <FontAwesomeIcon color={BLUE} icon={faGoogle} />
                  <Box mr={3} />
                  Sign In With Google
                </Button>
              )}
            </Box>
            <Box margin="15px">
              <Text>{changeLog[0].version}</Text>
            </Box>
            <Box margin="10px" />
            {firebase.isAuthenticated && (
              <Box minW="100%">
                <Button
                  onClick={() =>
                    firebaseApi.auth.signOut(dispatch, showInfoToast, history)
                  }
                >
                  Sign Out
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </DeviceWrapper>
    </Wrapper>
  );
};

export default Account;
