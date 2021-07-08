import { Badge, Box } from '@chakra-ui/layout';
import React from 'react';

const RackRecommendation = (props) => {
    return (
        props.recommended ? (
            <Box display="flex" alignItems="center">
                <Box marginRight="1px" />
                <Badge variant="subtle" colorScheme="green">Recommended</Badge>
                <Box marginRight="8px" />
            </Box>
        ) : (
            <Box display="flex" alignItems="center">
                <Box marginRight="1px" />
                <Badge variant="subtle" colorScheme="red">Not Recommended</Badge>
                <Box marginRight="8px" />
            </Box>
        )
    )
}

export default RackRecommendation;