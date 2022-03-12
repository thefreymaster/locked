import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Box,
  useToast,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { BLUE } from "../../constants";
import { CgClose, CgMenu } from "react-icons/cg";

import firebaseApi from "../../api/firebase";
// import Authenticated from '../Authenticated';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useGlobalState } from "../../providers/root";
import Authenticated from "../Authenticated";
import { changeLog } from "../../json/changeLog";

const SettingsMenu = () => {
  const { colorMode } = useColorMode();
  const { dispatch, firebase, meta } = useGlobalState();
  const toast = useToast();
  const history = useHistory();

  const showSuccessToast = () => {
    toast({
      title: "Authenticated",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };
  const showInfoToast = () => {
    toast({
      title: "See ya!",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };
  return (
    <Menu autoSelect={false} zIndex="100">
      {({ isOpen }) => (
        <>
          <MenuButton maxH={30} disabled={firebase.isValidatingAuthentication}>
            <SettingsMenuButton
              firebase={firebase}
              meta={meta}
              isOpen={isOpen}
            />
          </MenuButton>
          <MenuList>
            <MenuGroup
            >
              {firebase.isAuthenticated ? (
                <Authenticated />
              ) : (
                <MenuItem
                  onClick={() =>
                    firebaseApi.auth.signIn(dispatch, showSuccessToast)
                  }
                >
                  <FontAwesomeIcon color={colorMode === "light" ? "black" : "white"} icon={faGoogle} />
                  <Box mr={3} />
                  Sign In With Google
                </MenuItem>
              )}
            </MenuGroup>
            <MenuGroup>
              <MenuDivider />
              <MenuItem onClick={() => history.push("/account")}>
                Settings
              </MenuItem>
            </MenuGroup>
            <MenuGroup></MenuGroup>
            <MenuGroup>
              {firebase.isAuthenticated && (
                <>
                  <MenuDivider />
                  <MenuItem
                    onClick={() =>
                      firebaseApi.auth.signOut(dispatch, showInfoToast, history)
                    }
                  >
                    Sign Out
                  </MenuItem>
                </>
              )}
            </MenuGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

const SettingsMenuButton = ({ firebase, meta, isOpen }) => {
  if (firebase.isValidatingAuthentication) {
    return <Spinner color="white" colorScheme="white" />;
  }
  return firebase.isAuthenticated ? (
    <Authenticated avatarOnly avatarSize="sm" delay={3000} />
  ) : (
    <IconButton
      borderRadius="md"
      colorScheme="gray"
      icon={isOpen ? <CgClose /> : <CgMenu />}
    />
  );
};

export default SettingsMenu;
