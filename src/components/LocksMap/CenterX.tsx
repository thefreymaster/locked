import { useGlobalState } from '../../providers/root';
import { MdFilterCenterFocus } from 'react-icons/md';
import { Box, Fade } from '@chakra-ui/react';

export const CenterX = () => {
    const { coordinates } = useGlobalState();
    const { center } = coordinates;

    return (
        <Fade in={center.showCenter}>
            <Box position="absolute" left="calc(50% - 20px)" top="calc(50% - 20px)" zIndex="1000">
                <MdFilterCenterFocus size="32px" />
            </Box>
        </Fade>
    )
}