import React from 'react';
import { Text } from '@chakra-ui/react';

const Font = (props) => {
    const inline = {
        fontSize: props.fontSize,
        fontFamily: props.variant === 'primary' ? `'STIX Two Math', serif` : `'Roboto Condensed', sans-serif`,
        fontWeight: props.fontWeight,
        opacity: props.opacity,
        textAlign: props.textAlign,
        ...props.style
    }
    return <Text className={props.classname} onClick={props.onClick} style={inline}>{props.children}</Text>
}

export default Font;