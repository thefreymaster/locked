import React from 'react';
import { useGlobalState } from '../../providers/root';
import { Fade, Box, CloseButton, Image, Badge, Button, Divider } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import './users-map.scss';
import { isMobile } from 'react-device-detect';
import firebaseApi from '../../api/firebase';
import RackSize from './Size';
import RackRecommendation from './Recommendation';
import Font from '../../common/Font';
import { AiFillStar } from 'react-icons/ai';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import StarRating from '../../components/StarRating';
import DeleteRack from '../DeleteRack';

const RackPopup = (props) => {
    const { dispatch, firebase } = useGlobalState();
    const { lock } = props;
    const [fadeIn, setFadeIn] = React.useState(false);
    const [isDeleteOpenOpen, setIsOpen] = React.useState(false);
    const canEditDelete = firebase.isAuthenticated && firebase.provider && firebase.user.uid === lock?.author;
    const history = useHistory();

    React.useLayoutEffect(() => {
        if (lock) {
            firebaseApi.getImage({ fileUrl: lock.imageUrl, dispatch, id: props.id });
        }
    }, [lock, lock.imageUrl]);

    const inline = {
        borderRadius: 10,
        minWidth: 360,
        maxWidth: 360,
    }
    React.useLayoutEffect(() => {
        setTimeout(() => {
            setFadeIn(true);
        }, 250);
    }, [])
    return (
        <Fade in={fadeIn}>
            <Box flexDir="column" maxW="lg" key={lock.name} style={inline} display="flex">
                <Box width="100%" display="flex" justifyContent="flex-end">
                    <CloseButton position="absolute" color="white" margin={2} size="lg" onClick={() => {
                        setFadeIn(false);
                        props.setPopupViewport({ visible: false, coordinates: [], lock: {} });
                        props.setViewport({ ...props.viewport, zoom: 14 });
                        history.push('/map')
                    }} />
                </Box>
                <Image minH={isMobile ? 100 : 250} objectFit="cover" bg="red.800" color="white" loading="eager" borderRadius="10px 10px 0px 0px" name={lock.name} src={lock.imageUrlAbsolute} />
                <Box display="flex" flexDirection="row" padding="15px 15px 0px 15px">
                    <RackRecommendation recommended={lock.recommended} />
                    <Box mr={1} />
                    <RackSize size={lock.size} />
                    <Box flexGrow={1} />
                    <Badge>
                        <Box display="flex" direction="row" justifyContent="center" alignItems="center">
                            <Font>Overall</Font>
                            <AiFillStar color="#FBB03B" />
                            <Box marginRight="1px" />
                            <Font fontSize="12px" fontWeight={900}>{lock.ratings.quality}</Font>
                        </Box>
                    </Badge>

                </Box>
                <Box pt={3}>
                    <Divider />
                </Box>
                <Box padding="15px 15px 0px 15px">
                    <Font fontSize={24} textAlign="center">{lock.name}</Font>
                    <Box display="flex" direction="row" alignItems="flex-start" marginTop={4}>
                        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" flexGrow={1}>
                            <StarRating overallRating={lock.ratings.quality} />
                            <Font>Quality</Font>
                        </Box>
                        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" flexGrow={1}>
                            <StarRating overallRating={lock.ratings.safety} />
                            <Font>Safety</Font>
                        </Box>
                        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" flexGrow={1}>
                            <StarRating overallRating={lock.ratings.illumination} />
                            <Font>Illumination</Font>
                        </Box>
                    </Box>
                </Box>
                <Box pt={3}>
                    <Divider />
                </Box>
                {canEditDelete && (
                    <Box width="100%" display="flex" justifyContent="flex-end">
                        <Button
                            colorScheme="red"
                            margin={2}
                            size="sm"
                            icon={<BiTrash />}
                            onClick={() => setIsOpen(true)}
                        >Delete</Button>
                        <Box flexGrow={1} />
                        <Button
                            colorScheme="gray"
                            margin={2}
                            size="sm"
                            icon={<BiEditAlt />}
                            onClick={() => {
                                history.push(`/edit/${props.id}`);
                                props.onOpen();
                            }}
                        >Edit</Button>
                    </Box>
                )}
                <DeleteRack setIsOpen={setIsOpen} isOpen={isDeleteOpenOpen} id={props.id} />
            </Box>
        </Fade>
    )
}

export default RackPopup;