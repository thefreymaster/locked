import { Box, useColorMode } from "@chakra-ui/react";
import Lottie from "react-lottie";
import bicycleAnimation from "../animations/bicycle.json";
import bicycleAnimationDark from "../animations/bicycle-dark.json";
import { isMobile } from "react-device-detect";

const LottieLoading = () => {
  const { colorMode } = useColorMode();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData:
      colorMode === "light" ? bicycleAnimation : bicycleAnimationDark,
  };
  return (
    <Lottie
      options={defaultOptions}
      height={isMobile ? 200 : 400}
      width={isMobile ? 200 : 400}
    />
  );
};

export default LottieLoading;
