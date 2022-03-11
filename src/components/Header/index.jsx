import Flex from "../../common/Flex";
import "./header.scss";
import SettingsMenu from "../SettingsMenu";
import { Box, Slide, useColorMode, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useGlobalState } from "../../providers/root";
import LockAndKeyLogo from "../../common/Logo";
import Font from "../../common/Font";
import { BsFillBrightnessLowFill, BsMoonStarsFill } from "react-icons/bs";

const Header = () => {
  const { meta } = useGlobalState();
  const { colorMode, toggleColorMode } = useColorMode();

  const history = useHistory();
  const location = useLocation();
  const getBorder = () => {
    if (location.pathname === "/map") {
      return colorMode === "light"
        ? "1px solid #ffffff6b"
        : "1px solid #1926378c";
    }
  };
  const fixed = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 6,
    borderBottom: getBorder(),
  };

  return (
    <Slide direction="top" in style={{ zIndex: 10 }}>
      <Flex
        style={{ ...fixed }}
        transitionBackground
        display="flex"
        alignItems="center"
        padding={meta.isInstalled ? "50px 20px 15px 20px" : "15px 20px"}
        className="header"
      >
        <Flex display="flex" direction="column" justifyContent="center">
          <Flex
            display="flex"
            direction="row"
            margin="0px 0px 0px 0px"
            hoverCursor
            alignItems="center"
          >
            {/* <BsFillShieldLockFill /> */}
            <Link to="/map">
              <LockAndKeyLogo />
            </Link>
            <Box marginRight={2} />
            <Font
              variant="primary"
              onClick={() => history.push("/")}
              fontWeight="bold"
              color={colorMode === "light" ? "#1926378c" : "white"}
            >
              Lock & Key
            </Font>
          </Flex>
        </Flex>
        <Box marginRight={2} flexGrow={1} />
        <IconButton
          onClick={toggleColorMode}
          borderRadius={100}
          marginRight={4}
          size="sm"
          icon={
            colorMode === "light" ? (
              <BsMoonStarsFill />
            ) : (
              <BsFillBrightnessLowFill />
            )
          }
        />
        {!meta.isInstalled && <SettingsMenu />}
      </Flex>
    </Slide>
  );
};

export default Header;
