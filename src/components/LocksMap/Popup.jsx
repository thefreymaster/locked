import React from 'react';
import { useGlobalState } from '../../providers/root';
import { Fade, Box, CloseButton, Image, Badge, Button, Divider, Text } from '@chakra-ui/react';
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
import RackTraffic from './Traffic';
import { calculateOverallRating } from '../../utils/calcOverallRating';
import ToolTip from '../../common/ToolTip';

const RackPopup = (props) => {
    const { dispatch, firebase, meta } = useGlobalState();
    const { lock } = props;
    const [fadeIn, setFadeIn] = React.useState(false);
    const [isDeleteOpenOpen, setIsOpen] = React.useState(false);
    const canEditDelete = firebase.isAuthenticated && firebase.provider && firebase.user.uid === lock?.author;
    const history = useHistory();

    React.useLayoutEffect(() => {
        if (lock && lock?.imageUrl) {
            firebaseApi.getImage({ fileUrl: lock.imageUrl, dispatch, id: props.id });
        }
    }, [lock, lock.imageUrl]);

    const inline = {
        borderRadius: 10,
        minWidth: 320,
        maxWidth: 320,
    }
    React.useLayoutEffect(() => {
        setTimeout(() => {
            setFadeIn(true);
        }, 250);
    }, [])
    return (
        <Fade in={fadeIn}>
            <Box flexDir="column" maxW="lg" key={lock.name} style={inline} display="flex" minH="400px">
                <Box width="100%" display="flex" justifyContent="flex-end">
                    <CloseButton position="absolute" color="white" margin={2} mr={meta.isInstalled && 1} size="lg" onClick={() => {
                        setFadeIn(false);
                        props.setPopupViewport({ visible: false, coordinates: [], lock: {} });
                        props.setViewport({ ...props.viewport, zoom: 15 });
                        history.push('/map')
                    }} />
                </Box>
                <Image minH={isMobile ? 100 : 250} objectFit="cover" bg="red.800" color="white" loading="eager" borderRadius="10px 10px 0px 0px" name={lock.name} src={lock.imageUrlAbsolute} />
                <Box display="flex" flexDirection="row" padding="15px 15px 0px 15px" justifyContent="center" alignItems="center">
                    <RackRecommendation recommended={lock.recommended} />
                    <RackSize size={lock.size} />
                    <RackTraffic traffic={lock.traffic} />
                    <ToolTip label="Overall Rating">
                        <Badge>
                            <Box display="flex" direction="row" justifyContent="center" alignItems="center">
                                {/* <Font>Overall</Font> */}
                                <AiFillStar color="#FBB03B" />
                                <Box marginRight="1px" />
                                <Font fontSize="12px" fontWeight={900}>{calculateOverallRating({ ratings: lock.ratings })}</Font>
                            </Box>
                        </Badge>
                    </ToolTip>
                </Box>
                <Divider pt={3} />
                <Box padding="15px 15px 0px 15px">
                    <Font variant="primary" fontSize={24} textAlign="center" fontWeight="bold">{lock.name}</Font>
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
                            <Font>Lighting</Font>
                        </Box>
                        {/* {lock.traffic && lock.traffic !== 'medium' && (
                            <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" flexGrow={1}>
                                {
                                    lock.traffic === 'high' ? <BsGraphDown /> : <BsGraphUp />
                                }
                                <Font>Traffic</Font>
                            </Box>
                        )} */}
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
                        >
                            Remove
                        </Button>
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
                        >
                            Edit
                        </Button>
                    </Box>
                )}
                <DeleteRack setIsOpen={setIsOpen} isOpen={isDeleteOpenOpen} id={props.id} />
            </Box>
        </Fade>
    )
}

export default RackPopup;