import { Badge, Box } from '@chakra-ui/layout';
import React from 'react';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';
import ToolTip from '../../common/ToolTip';

const RackRecommendation = (props) => {
    return (
        props.recommended ? (
            <ToolTip label="Recommendation">
                <Box display="flex" alignItems="center">
                    <Box marginRight="1px" />
                    <Badge variant="subtle" colorScheme="green">
                        <RiThumbUpFill style={{ fontSize: 20, padding: 5 }} />
                    </Badge>
                    <Box marginRight="8px" />
                </Box>
            </ToolTip>
        ) : (
            <ToolTip label="Recommendation">
                <Box display="flex" alignItems="center">
                    <Box marginRight="1px" />
                    <Badge variant="subtle" colorScheme="red">
                        <RiThumbDownFill style={{ fontSize: 20, padding: 5 }} />
                    </Badge>
                    <Box marginRight="8px" />
                </Box>
            </ToolTip>
        )
    )
}

export default RackRecommendation;