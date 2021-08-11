import { Tag } from '@chakra-ui/react';
import React from 'react';

export const CurrentCoordinates = (props: { lat: string, long: string }) => {
    return (
        <Tag boxShadow="xl" position="absolute" top="80px" zIndex="1000" left={(window.innerWidth - 154)/2}>{props.lat.toFixed(5)}, {props.long.toFixed(5)}</Tag>
    )
}