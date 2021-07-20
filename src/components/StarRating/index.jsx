import { Box } from '@chakra-ui/react';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import Font from '../../common/Font';

const Star = (props) => {
    if(props.overallRating === props.rating){
        return <BsStarFill color="#FBB03B" />;
    }
    if (props.overallRating >= props.rating || props.overallRating + 0.5 >= props.rating) {
        if (props.overallRating + 0.5 >= props.rating && props.overallRating <= props.rating) {
            return <BsStarHalf color="#FBB03B" />
        }
        if (props.rating % 1 === 0) {
            return <BsStarFill color="#FBB03B" />
        }
        return <BsStarFill color="#FBB03B" />
    }
    return <BsStar color="#FBB03B" />
}

const StarRating = (props) => {
    return (
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Box display="flex" flexDirection="row" alignItems="center">
                <Star overallRating={props.overallRating} rating={1} />
                <Star overallRating={props.overallRating} rating={2} />
                <Star overallRating={props.overallRating} rating={3} />
                <Star overallRating={props.overallRating} rating={4} />
                <Star overallRating={props.overallRating} rating={5} />
            </Box>
            {/* <Box marginRight="3px" />
            <Box display="flex" flexDirection="row" alignItems="center">
                <Font style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }} fontSize={12} fontWeight={700}>
                    {props.overallRating}
                </Font>
            </Box>
            <Box marginRight="8px" /> */}
        </Box>
    )
}

export default StarRating;


// {props.overallRating >= 1 ? <BsStarFill color="#FBB03B" /> : <BsStar color="#FBB03B" />}
// <Box marginRight="1px" />
// {props.overallRating >= 2 ? <BsStarFill color="#FBB03B" /> : <BsStar color="#FBB03B" />}
// <Box marginRight="1px" />
// {props.overallRating >= 3 ? <BsStarFill color="#FBB03B" /> : <BsStar color="#FBB03B" />}
// {/* {props.overallRating >= 3.5 && props.overallRating < 4 && <BsStarHalf color="#FBB03B" />} */}
// <Box marginRight="1px" />
// {props.overallRating >= 4 ? <BsStarFill color="#FBB03B" /> : <BsStar color="#FBB03B" />}
// <Box marginRight="1px" />
// {props.overallRating >= 5 ? <BsStarFill color="#FBB03B" /> : <BsStar color="#FBB03B" />}
