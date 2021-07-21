import React from 'react';
import { BsShieldLockFill, BsShield, BsShieldShaded } from 'react-icons/bs';
import { PRIMARY_GREEN, PRIMARY_YELLOW, PRIMARY_RED } from '../../constants';

const BikeRackMarker = (props: {
    overallRating: number
}) => {
    const style = {
        // transform: 'translate(6px, 6px) rotate(45deg)',
        fontSize: 15,
        width: 25,
        height: 25,
        backgroundColor: 'white',
        // transform: 'rotate(45deg)',
        zIndex: -1,
        top: '0px',
        left: '0px',
        borderRadius: '50px 50px 0px 50px',
        boxShadow: 'rgb(255 255 255 / 50%) 0px 0px 0px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
        padding: 5,
    }

    if (props.overallRating >= 4) {
        return <BsShieldLockFill style={{ ...style, color: PRIMARY_GREEN }} />
    }
    if (props.overallRating < 4 && props.overallRating > 3) {
        return <BsShieldShaded style={{ ...style, color: PRIMARY_YELLOW }} />
    }
    return <BsShieldLockFill style={{ ...style, color: PRIMARY_RED }} />
}

export default BikeRackMarker;