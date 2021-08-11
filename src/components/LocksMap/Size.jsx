import { Badge, Box } from '@chakra-ui/layout';
import React from 'react';
import ToolTip from '../../common/ToolTip';

const RackSize = (props) => {
    if (props.size === 'sm') {
        return (
            <ToolTip label={`${props.size.toUpperCase()} Size`}>
                <Box display="flex" alignItems="center">
                    <Box marginRight="1px" />
                    <Badge variant="subtle" colorScheme="red">SM</Badge>
                    <Box marginRight="8px" />
                </Box>
            </ToolTip>
        )
    }
    if (props.size === 'md') {
        return (
            <ToolTip label={`${props.size.toUpperCase()} Size`}>
                <Box display="flex" alignItems="center">
                    <Box marginRight="1px" />
                    <Badge variant="subtle" colorScheme="yellow">MD</Badge>
                    <Box marginRight="8px" />
                </Box>
            </ToolTip>
        )
    }
    return (
        <ToolTip label={`${props.size.toUpperCase()} Size`}>
            <Box display="flex" alignItems="center">
                <Box marginRight="1px" />
                <Badge variant="subtle" colorScheme="green">LG</Badge>
                <Box marginRight="8px" />
            </Box>
        </ToolTip>
    )
}

export default RackSize;