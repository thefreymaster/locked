import {
  Box,
  Button,
  useDisclosure,
  useToast,
  useColorMode,
  Switch,
  Text,
} from "@chakra-ui/react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import firebaseApi from "../../api/firebase";
import Wrapper from "../../common/Wrapper";
import { useGlobalState } from "../../providers/root";
import Authenticated from "../Authenticated";
import { Link, useHistory } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import LottieLoading from "../../common/LottieLoading";
import DeviceWrapper from "../../common/DeviceWrapper";
import Font from "../../common/Font";
import { BackButton } from "../../common/BackButton";
import { MdOutlineChangeCircle } from "react-icons/md";
import { BsMoonStars } from "react-icons/bs";
import { FaMapMarkedAlt, FaSatellite } from "react-icons/fa";
import { isGPSNotEnabled, isGPSEnabled } from "../../actions/index";

const Account = () => {
  const [signOutConfirm, setSignOutConfirm] = React.useState(false);
  const { dispatch, firebase, meta } = useGlobalState();
  const { onToggle } = useDisclosure();
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

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

  const showGPSSuccessToast = () => {
    toast({
      title: "GPS tracking enabled",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const hideGPSInfoToast = () => {
    toast({
      title: "GPS tracking disabled",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  React.useEffect(() => {
    onToggle();
  }, []);

  if (firebase.isValidatingAuthentication) {
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
          <Box
            borderRadius="lg"
            boxShadow="md"
            marginTop={4}
            padding={4}
            minW="100%"
          >
            <Box
              minW="100%"
              size="md"
              borderBottomRightRadius="0px"
              borderBottomLeftRadius="0px"
              display="flex"
              alignItems="center"
            >
              {firebase.isAuthenticated ? (
                <Authenticated justifyContent="flex-start" />
              ) : (
                <Button
                  boxShadow="md"
                  minW="100%"
                  onClick={() =>
                    firebaseApi.auth.signIn(dispatch, showSuccessToast)
                  }
                >
                  <FontAwesomeIcon
                    color={colorMode === "light" ? "black" : "white"}
                    icon={faGoogle}
                  />
                  <Box mr={3} />
                  Sign In With Google
                </Button>
              )}
            </Box>
          </Box>
          <Box
            borderRadius="lg"
            boxShadow="md"
            marginTop={4}
            padding={4}
            minW="100%"
          >
            <Box
              minW="100%"
              size="md"
              borderBottomRightRadius="0px"
              borderBottomLeftRadius="0px"
              display="flex"
              alignItems="center"
            >
              <FaSatellite />
              <Text marginLeft={2}>Real Time Tracking</Text>
              <Box flexGrow={1} />
              <Switch
                size="md"
                colorScheme="yellow"
                isChecked={meta.liveGPSEnabled}
                onChange={(c) => {
                  if (c.target.checked) {
                    showGPSSuccessToast();
                    localStorage.setItem("gps-tracking", "true");
                  } else {
                    hideGPSInfoToast();
                    localStorage.setItem("gps-tracking", "false");
                  }
                  return c.target.checked
                    ? dispatch(isGPSEnabled)
                    : dispatch(isGPSNotEnabled);
                }}
              />
            </Box>
          </Box>
          <Box
            borderRadius="lg"
            boxShadow="md"
            marginTop={4}
            padding={4}
            minW="100%"
          >
            <Box
              minW="100%"
              size="md"
              borderBottomRightRadius="0px"
              borderBottomLeftRadius="0px"
              display="flex"
              alignItems="center"
            >
              <BsMoonStars />
              <Text marginLeft={2}>Dark Mode</Text>
              <Box flexGrow={1} />
              <Switch
                size="md"
                colorScheme="yellow"
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
              />
            </Box>
          </Box>
          <Box minW="100%" marginTop={4} boxShadow="md" borderRadius="5px">
            <Link to="/changes">
              <Button
                minW="100%"
                size="md"
                colorScheme="gray"
                borderBottomRightRadius="0px"
                borderBottomLeftRadius="0px"
                _hover={{ backgroundColor: "#edf2f778" }}
              >
                <MdOutlineChangeCircle />
                <Text marginLeft={2}>Change Log</Text>
                <Box flexGrow={1} />
                <FiChevronRight />
              </Button>
            </Link>
            <Link to="/account/map-settings">
              <Button
                minW="100%"
                size="md"
                borderRadius="0px"
                borderBottomRightRadius={
                  firebase.isAuthenticated ? "0px" : "5px"
                }
                borderBottomLeftRadius={
                  firebase.isAuthenticated ? "0px" : "5px"
                }
                _hover={{ backgroundColor: "#edf2f778" }}
              >
                <FaMapMarkedAlt />
                <Text marginLeft={2}>Map Settings</Text>
                <Box flexGrow={1} />
                <FiChevronRight />
              </Button>
            </Link>
            {firebase.isAuthenticated && (
              <Button
                minW="100%"
                borderTopRightRadius="0px"
                borderTopLeftRadius="0px"
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
