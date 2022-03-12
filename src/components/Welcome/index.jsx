import {
  Box,
  Button,
  Divider,
  SlideFade,
  toast,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import firebaseApi from "../../api/firebase";
import Font from "../../common/Font";
import Wrapper from "../../common/Wrapper";
import { useGlobalState } from "../../providers/root";
import { isMobile } from "react-device-detect";
import "./welcome.scss";
import { PRIMARY_COLOR_SCHEME } from "../../constants";
import LottieLoading from "../../common/LottieLoading";
import MAP_IMAGE from "../../assets/map.jpeg";
import MAP_IMAGE_DARK from "../../assets/map-dark.jpeg";

const Welcome = () => {
  const { colorMode } = useColorMode();
  const { firebase, dispatch } = useGlobalState();
  const { isOpen, onToggle } = useDisclosure();
  const histroy = useHistory();

  React.useEffect(() => {
    onToggle();
  }, []);

  const showSuccessToast = () => {
    toast({
      title: "Authenticated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  if (firebase.isValidatingAuthentication) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <LottieLoading />
      </Box>
    );
  }
  if (!firebase.isValidatingAuthentication && firebase.isAuthenticated) {
    return <Redirect to="/map" />;
  }
  const background = {
    backgroundImage: `url(${
      colorMode === "light" ? MAP_IMAGE : MAP_IMAGE_DARK
    })`,
    width: window.innerWidth,
    height: window.innerHeight,
    position: "absolute",
    top: 0,
    filter: "blur(10px)",
    transform: "scale(1)",
    zIndex: -1,
  };
  return (
    <div
      style={{
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SlideFade direction="bottom" in={isOpen}>
          <Wrapper>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <Font
                fontWeight={900}
                fontSize={isMobile ? 56 : 124}
                variant="primary"
              >
                Lock & Key
              </Font>
              <Font fontWeight={600} fontSize={18}>
                Lock your bike up with confidence
              </Font>
              <Box mt={5} />
              <Button
                leftIcon={<BsSearch />}
                size="lg"
                colorScheme={PRIMARY_COLOR_SCHEME}
                disabled={firebase.isValidatingAuthentication}
                onClick={() => histroy.push("/map")}
              >
                Search Your Area
              </Button>
              <Divider mt={5} />
              <Box mt={5} display="flex" flexDir={isMobile ? "column" : "row"}>
                <Button
                  size="sm"
                  colorScheme="gray"
                  disabled={firebase.isValidatingAuthentication}
                  onClick={() =>
                    firebaseApi.auth.signIn(dispatch, showSuccessToast)
                  }
                >
                  Sign In With Google
                </Button>
              </Box>
            </Box>
          </Wrapper>
          <div style={background} className="cover-background" />
        </SlideFade>
      </div>
    </div>
  );
};

export default Welcome;
