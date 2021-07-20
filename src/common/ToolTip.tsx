import React from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

const ToolTip = (props: { children: React.ReactNode, label: string }) => {
    return (
        <ChakraTooltip hasArrow bg="gray.300" color="black" placement="top" label={props.label} aria-label={props.label}>
            {props.children}
        </ChakraTooltip>
    )
}

export default ToolTip;