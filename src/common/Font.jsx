import React from 'react';

const Font = (props) => {
    const inline = {
        color: props.color || "#424242",
        fontSize: props.fontSize,
        fontFamily: props.variant === 'primary' ? `'STIX Two Math', serif` : `'Roboto Condensed', sans-serif`,
        fontWeight: props.fontWeight,
        opacity: props.opacity,
        textAlign: props.textAlign,
        ...props.style
    }
    return <div className={props.classname} onClick={props.onClick} style={inline}>{props.children}</div>
}

export default Font;