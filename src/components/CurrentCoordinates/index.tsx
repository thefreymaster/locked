import { Tag } from '@chakra-ui/react';
import React from 'react';
import { useGlobalState } from '../../providers/root';

export const CurrentCoordinates = () => {
    const { coordinates } = useGlobalState();
    const { center } = coordinates;
    return (
        <Tag
            backgroundColor="orange.100"
            boxShadow="xs"
            position="absolute"
            top="70px"
            zIndex="1000"
            left={(window.innerWidth - 154) / 2}>{center.latitude.toFixed(5)}, {center.longitude.toFixed(5)}
        </Tag>
    )
}