import { Box, Button, useDisclosure, useToast, Slide } from "@chakra-ui/react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import firebaseApi from "../../api/firebase";
import Wrapper from "../../common/Wrapper";
import { BLUE } from "../../constants";
import { useGlobalState } from "../../providers/root";
import Authenticated from "../Authenticated";
import { Link, useHistory } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import LottieLoading from "../../common/LottieLoading";
import DeviceWrapper from "../../common/DeviceWrapper";
import Font from "../../common/Font";
import { BackButton } from "../../common/BackButton";

const Account = () => {
  const [signOutConfirm, setSignOutConfirm] = React.useState(false);
  const { dispatch, firebase, meta } = useGlobalState();
  const { onToggle } = useDisclosure();
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
          >
            <BackButton />
            <Box flexGrow={1} />
            <Font variant="primary" fontWeight="bold" fontSize="32px">
              Settings
            </Font>
          </Box>
          <Box borderRadius="lg" boxShadow="md" padding={4} minW="100%">
            {firebase.isAuthenticated ? (
              <Authenticated justifyContent="flex-start" />
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
          <Box minW="100%" marginTop={4} boxShadow="md" borderRadius="5px">
            <Link to="/changes">
              <Button
                minW="100%"
                size="md"
                backgroundColor="white"
                borderTop="1px solid #80808021"
                borderBottomRightRadius="0px"
                borderBottomLeftRadius="0px"
                _hover={{ backgroundColor: "#edf2f778" }}
              >
                Change Log
                <Box flexGrow={1} />
                <FiChevronRight />
              </Button>
            </Link>
            <Link to="/account/map-settings">
              <Button
                minW="100%"
                size="md"
                borderRadius="0px"
                backgroundColor="white"
                _hover={{ backgroundColor: "#edf2f778" }}
              >
                Map Settings
                <Box flexGrow={1} />
                <FiChevronRight />
              </Button>
            </Link>
            {firebase.isAuthenticated && (
              <Button
                minW="100%"
                borderTopRightRadius="0px"
                borderTopLeftRadius="0px"
                backgroundColor="white"
                _hover={{ backgroundColor: "#edf2f778" }}
                onClick={() => {
                  setSignOutConfirm(true);
                }}
              >
                {signOutConfirm ? (
                  <Box display="flex" justifyContent="flex-end" minW="100%">
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        setSignOutConfirm(false);
                      }}
                      colorScheme="gray"
                      size="sm"
                      marginRight={2}
                    >
                      Cancel
                    </Button>
                    <Box flexGrow={1} />
                    <Button
                      onClick={() =>
                        firebaseApi.auth.signOut(
                          dispatch,
                          showInfoToast,
                          history
                        )
                      }
                      colorScheme="red"
                      size="sm"
                    >
                      Confirm Sign Out?
                    </Button>
                  </Box>
                ) : (
                  <Box display="flex" alignItems="center" minW="100%">
                    <Box>Sign Out</Box>
                    <Box flexGrow={1} />
                    <IoCloseOutline />
                  </Box>
                )}
              </Button>
            )}
          </Box>
          {/* <Box
            borderRadius="lg"
            boxShadow="md"
            padding={4}
            minW="100%"
            marginTop={4}
          >
            <Link to="/changes">
              <Button minW="100%" colorScheme="yellow" size="sm">
                Change Log
              </Button>
            </Link>
            <Divider />
            <Box>
              <Switch
                onChange={() =>
                  alpha.minimal
                    ? dispatch({ type: "IS_NOT_ALPHA" })
                    : dispatch({ type: "IS_ALPHA" })
                }
                colorScheme="purple"
                id="email-alerts"
              />
              <Box flexGrow={1} />
              <Box>
                <Badge colorScheme="purple">ALPHA FEATURES</Badge>
              </Box>
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
          </Box> */}
        </Box>
      </DeviceWrapper>
    </Wrapper>
  );
};

export default Account;
