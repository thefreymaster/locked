import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import React from 'react';
import { useGlobalState } from '../../providers/root';
import { Redirect } from 'react-router-dom';
import { Spinner, Fade, Box, CloseButton, Image, Badge, Button, Divider } from '@chakra-ui/react';
import AbsoluteButton from '../../common/AbsoluteButton';
import { useHistory, useParams } from 'react-router-dom';
import { BsFillShieldLockFill } from 'react-icons/bs';
import './users-map.scss';
import { calculateOverallRating } from '../../utils/calcOverallRating';
import { PRIMARY_GREEN, PRIMARY_YELLOW, PRIMARY_RED } from '../../constants';
import { isMobile } from 'react-device-detect';
import firebaseApi from '../../api/firebase';
import DeviceWrapper from '../../common/DeviceWrapper';
import RackSize from './Size';
import RackRecommendation from './Recommendation';
import Font from '../../common/Font';
import { AiFillStar } from 'react-icons/ai';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import StarRating from '../../components/StarRating';
import DeleteRack from '../DeleteRack';
import { debounce } from 'lodash';

const Map = ReactMapboxGl({
    accessToken:
        process.env.REACT_APP_MAPBOX_TOKEN
});

const UserMap = () => {
    const { coordinates, firebase } = useGlobalState();
    const { id } = useParams();

    // if (!firebase.isAuthenticated) {
    //     return (
    //         <Redirect to="/" />
    //     )
    // }
    if (!coordinates.hasCoordinates) {
        if (id) {
            return (
                <Redirect to={`/request/${id}`} />
            )
        }
        return (
            <Redirect to="/request" />
        )
    }
    return (
        <DeviceWrapper>
            <MapContainer id={id} />
        </DeviceWrapper>
    )
}

const MapContainer = (props) => {
    let initialViewport;
    const { locks, coordinates, firebase, dispatch } = useGlobalState();
    const lock = locks[props.id];

    if (props.id) {
        initialViewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: lock.location.lat + 0.00061000001135,
            longitude: lock.location.long,
            zoom: 18,
        }
    }
    else {
        initialViewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            zoom: 14,
        }
    }

    const [viewport, setViewport] = React.useState({ ...initialViewport });
    const [popupViewport, setPopupViewport] = React.useState({
        visible: props.id ? true : false,
        coordinates: lock ? [lock.location.long, lock.location.lat + 0.00009590001135] : [],
        lock: lock || {},
        id: props.id,
    })
    const history = useHistory();

    if (!viewport) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner colorScheme="red" size="md" />
            </Box>
        )
    }
    return (
        <>
            <Map
                style="mapbox://styles/thefreymaster/ckke447ga0wla19k1cqupmrrz"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
                center={[viewport.longitude, viewport.latitude]}
                zoom={[viewport.zoom]}
            >
                <BikeRacksContainer setViewport={setViewport} viewport={viewport} setPopupViewport={setPopupViewport} />
                {popupViewport.visible && (
                    <Popup
                        anchor="bottom"
                        coordinates={popupViewport.coordinates}
                        offset={8}>
                        <RackPopup
                            setViewport={setViewport}
                            viewport={viewport}
                            setPopupViewport={setPopupViewport}
                            id={popupViewport.id}
                            lock={popupViewport.lock}
                        />
                    </Popup>
                )}
                <MarkerContainer coordinates={coordinates} />
            </Map>
            {firebase.isAuthenticated && <AbsoluteButton onClick={() => history.push('/add')}>Add</AbsoluteButton>}
        </>
    )
}

const style = {
    width: 25,
    height: 25,
    backgroundColor: 'white',
    transform: 'rotate(45deg)',
    zIndex: -1,
    top: '0px',
    left: '0px',
    borderRadius: '50px 50px 0px 50px',
    boxShadow: 'rgb(255 255 255 / 50%) 0px 0px 0px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
}

const getColor = (ratings) => {
    const overallRating = calculateOverallRating({ ratings });
    if (overallRating >= 4) {
        return PRIMARY_GREEN;
    }
    if (overallRating < 4 && overallRating > 3) {
        return PRIMARY_YELLOW;
    }
    return PRIMARY_RED;
}

const BikeRacksContainer = (props) => {
    const { locks } = useGlobalState();
    const history = useHistory();

    return Object.entries(locks).map(([key, value]) => {
        const { location, ratings } = value;
        return (
            <Marker onClick={() => {
                props.setPopupViewport({ visible: true, coordinates: [value.location.long, value.location.lat + 0.00015590001135], lock: value, id: key })
                props.setViewport({ zoom: 16, latitude: location.lat + 0.00199590001135, longitude: location.long });
                history.push(`/map/${key}`);
            }}
                key={`friend-marker-${key}`}
                coordinates={[location.long, location.lat]}
                className="rack-marker">
                <div style={style}>
                    <BsFillShieldLockFill style={{ transform: 'translate(6px, 6px) rotate(-45deg)', color: getColor(ratings), fontSize: 15 }} />
                </div>
            </Marker>
        )
    })

}

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
                                history.push(`/edit/${props.id}`)
                            }}
                        >Edit</Button>
                    </Box>
                )}
                <DeleteRack setIsOpen={setIsOpen} isOpen={isDeleteOpenOpen} id={props.id} />
            </Box>
        </Fade>
    )
}

const MarkerContainer = (props) => {
    return (
        <Marker key="you-marker" coordinates={[props.coordinates.longitude, props.coordinates.latitude]}>
            <div className="you" />
        </Marker>
    )
}

export default UserMap;