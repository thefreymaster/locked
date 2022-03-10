import Flex from "../../common/Flex";
import "./header.scss";
import SettingsMenu from "../SettingsMenu";
import { Box, Slide, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { useGlobalState } from "../../providers/root";
import LockAndKeyLogo from "../../common/Logo";
import Font from "../../common/Font";
import { useModalControlState } from "../../providers/ModalControl";

const Header = () => {
  const { onOpenNewUser, onOpenAddToMap } = useModalControlState();
  const { meta, user, firebase } = useGlobalState();
  const history = useHistory();
  const location = useLocation();
  const fixed = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 6,
    borderBottom: location.pathname !== "/" && "1px solid #ffffff6b",
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
            >
              Lock & Key
            </Font>
          </Flex>
        </Flex>
        <Box marginRight={2} flexGrow={1} />
        {/* {firebase.isAuthenticated && (
          <IconButton
            onClick={() => {
              if (user.isNew) {
                onOpenNewUser();
              } else {
                history.push("/add");
                onOpenAddToMap();
              }
            }}
            size="sm"
            marginRight={5}
            colorScheme="yellow"
            borderRadius={3}
            icon={<FiPlusCircle />}
          />
        )} */}
        {!meta.isInstalled && <SettingsMenu />}
      </Flex>
    </Slide>
  );
};

export default Header;
