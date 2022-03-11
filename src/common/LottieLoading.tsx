import { Box, useColorMode } from "@chakra-ui/react";
import Lottie from "react-lottie";
import bicycleAnimation from "../animations/bicycle.json";
import bicycleAnimationDark from "../animations/bicycle-dark.json";

const LottieLoading = () => {
  const { colorMode } = useColorMode();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData:
      colorMode === "light" ? bicycleAnimation : bicycleAnimationDark,
  };
  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default LottieLoading;
