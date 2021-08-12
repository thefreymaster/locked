import React from 'react';
import { useGlobalState } from '../../providers/root';
import { MdClear } from 'react-icons/md';
import { Box, Fade } from '@chakra-ui/react';

export const CenterX = () => {
    const { coordinates } = useGlobalState();
    const { center } = coordinates;

    return (
        <Fade in={center.showCenter}>
            <Box position="absolute" left="50%" top="50%" zIndex="1">
                <MdClear size="32px" />
            </Box>
        </Fade>
    )
}