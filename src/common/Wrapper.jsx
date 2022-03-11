import { isMobile } from "react-device-detect";
import { useColorMode } from "@chakra-ui/react";
import { useGlobalState } from "../providers/root";

const Wrapper = (props) => {
  const { colorMode } = useColorMode();
  const { meta } = useGlobalState();
  const inline = {
    margin: meta.isInstalled ? "125px 20px 20px 20px" : "90px 20px 20px 20px",
    minHeight: meta.isInstalled
      ? window.innerHeight - 230
      : window.innerHeight - 110,
    minWidth: window.innerWidth - 40,
    justifyContent: props.justifyContent || "center",
  };
  return (
    <div
      style={inline}
      className={isMobile ? "mobile-wrapper" : "desktop-wrapper"}
    >
      {props.children}
    </div>
  );
};

export default Wrapper;
