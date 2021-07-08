import { Badge, Box } from '@chakra-ui/layout';
import React from 'react';

const RackSize = (props) => {
    if (props.size === 'sm') {
        return (
            <Box display="flex" alignItems="center">
                <Box marginRight="1px" />
                <Badge variant="subtle" colorScheme="red">SM</Badge>
                <Box marginRight="8px" />
            </Box>
        )
    }
    if (props.size === 'md') {
        return (
            <Box display="flex" alignItems="center">
                <Box marginRight="1px" />
                <Badge variant="subtle" colorScheme="yellow">MD</Badge>
                <Box marginRight="8px" />
            </Box>
        )
    }
    return (
        <Box display="flex" alignItems="center">
            <Box marginRight="1px" />
            <Badge variant="subtle" colorScheme="green">LG</Badge>
            <Box marginRight="8px" />
        </Box>
    )
}

export default RackSize;