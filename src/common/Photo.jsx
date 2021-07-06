import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { useGlobalState } from '../providers/root';

const Photo = (props) => {
    const { meta } = useGlobalState();
    const imageHeight = meta.isInstalled ? window.innerHeight - 578 : window.innerHeight - 478;
    return (
        <Box className="restaurant-details-parent" borderRadius="10px 10px 0px 0px" minH={imageHeight} objectFit="cover">
            <Image
                className="restaurant-details-image"
                minW="100%"
                minH={imageHeight}
                objectFit="cover"
                bg="red.800"
                color="white"
                loading="eager"
                borderRadius={props.shelf ? "10px 10px 0px 0px" : "10px 10px 10px 10px"}
                name={props.name}
                src={props.imageUrlAbsolute}
            />
        </Box>
    )
}

export default Photo;