import React from 'react';
import { BsFillLockFill } from 'react-icons/bs';
import { PRIMARY_GREEN, PRIMARY_YELLOW, PRIMARY_RED } from '../../constants';

const BikeRackMarker = (props: {
    overallRating: number
}) => {
    const style = {
        transform: 'translate(6px, 6px) rotate(-45deg)',
        fontSize: 12
    }

    if (props.overallRating >= 4) {
        return <BsFillLockFill style={{ ...style, color: PRIMARY_GREEN }} />
    }
    if (props.overallRating < 4 && props.overallRating > 3) {
        return <BsFillLockFill style={{ ...style, color: PRIMARY_YELLOW }} />
    }
    return <BsFillLockFill style={{ ...style, color: PRIMARY_RED }} />
}

export default BikeRackMarker;