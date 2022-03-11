import { useGlobalState } from '../../providers/root';
import { CgMathPlus } from 'react-icons/cg';
import { Box, Fade, useColorMode } from '@chakra-ui/react';

export const CenterX = () => {
    const { colorMode } = useColorMode();
    const { coordinates } = useGlobalState();
    const { center } = coordinates;

    return (
        <Fade in={center.showCenter}>
            <Box position="absolute" left="calc(50% - 20px)" top="calc(50% - 20px)" zIndex="2">
                <CgMathPlus color={colorMode === 'light' ? "black" : "white"} size="32px" />
            </Box>
        </Fade>
    )
}