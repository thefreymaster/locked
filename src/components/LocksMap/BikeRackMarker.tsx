import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineBadgeCheck, HiOutlineXCircle, HiOutlineMinusCircle } from 'react-icons/hi';
import { PRIMARY_GREEN, PRIMARY_YELLOW, PRIMARY_RED } from '../../constants';

const BikeRackMarker = (props: {
    overallRating: number
}) => {
    const style = {
        fontSize: 15,
        width: 25,
        height: 25,
        backgroundColor: 'white',
        zIndex: -1,
        top: '0px',
        left: '0px',
        borderRadius: '50px 50px 50px 50px',
        transition: 'box-shadow 150ms ease-in-out',
    }

    if (props.overallRating >= 4) {
        return (
            <Icon
                boxShadow="base"
                _hover={{
                    boxShadow: "dark-lg",
                }}
                as={(p) => <HiOutlineBadgeCheck {...p} style={{ ...style, color: PRIMARY_GREEN }} />}
            />
        )
    }
    if (props.overallRating < 4 && props.overallRating > 3) {
        return (
            <Icon
                boxShadow="base"
                _hover={{
                    boxShadow: "dark-lg",
                }}
                as={(p) => <HiOutlineMinusCircle {...p} style={{ ...style, color: PRIMARY_YELLOW }} />}
            />
        )
    }
    return (
        <Icon
            boxShadow="base"
            _hover={{
                boxShadow: "dark-lg",
            }}
            as={(p) => <HiOutlineXCircle {...p} style={{ ...style, color: PRIMARY_RED }} />}
        />
    )
}

export default BikeRackMarker;