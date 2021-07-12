import { Badge, Box } from '@chakra-ui/layout';
import React from 'react';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';

const RackRecommendation = (props) => {
    return (
        props.recommended ? (
            <Box display="flex" alignItems="center">
                <Box marginRight="1px" />
                <Badge variant="subtle" colorScheme="green">
                    <RiThumbUpFill style={{ fontSize: 20, padding: 5 }} />
                </Badge>
                <Box marginRight="8px" />
            </Box>
        ) : (
            <Box display="flex" alignItems="center">
                <Box marginRight="1px" />
                <Badge variant="subtle" colorScheme="red">
                    <RiThumbDownFill style={{ fontSize: 20, padding: 5 }} />
                </Badge>
                <Box marginRight="8px" />
            </Box>
        )
    )
}

export default RackRecommendation;