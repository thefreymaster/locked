import Wrapper from '../../common/Wrapper';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import React, { useEffect } from 'react';
import { useGlobalState } from '../../providers/root';
import { Redirect } from 'react-router-dom';
import { Spinner, Fade, Box, CloseButton, Badge, Image } from '@chakra-ui/react';
import AbsoluteButton from '../../common/AbsoluteButton';
import { useHistory, useParams } from 'react-router-dom';
import { AiFillLock } from 'react-icons/ai';
import './users-map.scss';
import { calculateOverallRating } from '../../utils/calcOverallRating';
import { PRIMARY_GREEN, PRIMARY_YELLOW, PRIMARY_RED } from '../../constants';
import { isMobile } from 'react-device-detect';
import Flex from '../../common/Flex';
import firebaseApi from '../../api/firebase';

const Map = ReactMapboxGl({
    accessToken:
        process.env.REACT_APP_MAPBOX_TOKEN
});

const UserMap = () => {
    const { coordinates, firebase } = useGlobalState();
    const { id } = useParams();

    if (!firebase.isAuthenticated) {
        return (
            <Redirect to="/" />
        )
    }
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
        <Wrapper>
            <MapContainer coordinates={coordinates} />
        </Wrapper>
    )
}

const defaultState = {
    width: window.innerWidth,
    height: window.innerHeight,
    zoom: 14,
}

const MapContainer = (props) => {
    let viewportObj;
    let lat;
    let long;

    const { locks, coordinates } = useGlobalState();
    const lock = locks[props.id];

    if (props.id) {
        viewportObj = {
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: lock.location.lat + 0.00061000001135,
            longitude: lock.location.long,
            zoom: 18,
        }
        lat = parseFloat(lock.location.lat);
        long = parseFloat(lock.location.long);
    }
    else {
        viewportObj = {
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            zoom: 14,
        }
        lat = parseFloat(coordinates.lat);
        long = parseFloat(coordinates.long);
    }

    const [popupViewport, setPopupViewport] = React.useState({
        visible: props.id ? true : false,
        coordinates: lock ? [lock.location.long, lock.location.lat + 0.00009590001135] : [],
        lock: lock || {},
        id: props.id,
    })

    useEffect(() => {
        setViewport({ ...viewportObj })
    }, [])

    const [viewport, setViewport] = React.useState({ ...viewportObj });
    const history = useHistory();

    if (!viewport) {
        return <Spinner />
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
                {popupViewport.visible && (
                    <Popup
                        anchor="bottom"
                        coordinates={popupViewport.coordinates}
                        offset={8}>
                        <RestaurantPopup setPopupViewport={setPopupViewport} id={popupViewport.id} lock={popupViewport.lock} />
                    </Popup>
                )}
                <MarkerContainer coordinates={props.coordinates} />
                <BikeRacksContainer setViewport={setViewport} viewport={viewport} setPopupViewport={setPopupViewport} />
            </Map>
            <AbsoluteButton onClick={() => history.push('/add')}>Add</AbsoluteButton>
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
                history.push(`/map/${key}`);
                props.setPopupViewport({ visible: true, coordinates: [value.location.long, value.location.lat + 0.00009590001135], lock: value, id: key })
                props.setViewport({ zoom: 16, latitude: location.lat, longitude: location.long });
            }}
                key={`friend-marker-${key}`}
                coordinates={[location.long, location.lat]}>
                <div style={style}>
                    <AiFillLock style={{ transform: 'translate(6px, 6px) rotate(-45deg)', color: getColor(ratings) }} />
                </div>
            </Marker>
        )
    })

}

const RestaurantPopup = (props) => {
    const { dispatch } = useGlobalState();
    const { lock } = props;
    const [fadeIn, setFadeIn] = React.useState(false);

    React.useLayoutEffect(() => {
        if (lock) {
            firebaseApi.getImage({ fileUrl: lock.imageUrl, dispatch, id: props.id });
        }
    }, [lock, lock.imageUrl]);

    const inline = {
        borderRadius: 10,
        marginBottom: 15,
        minWidth: !isMobile && "80%",
        width: 300,
        height: 300,
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
                        setFadeIn(false)
                        props.setPopupViewport({ visible: false, coordinates: [], lock: {} })
                    }} />
                </Box>
                <Image minH={isMobile ? 100 : 250} objectFit="cover" bg="red.800" color="white" loading="eager" borderRadius="10px 10px 0px 0px" name={lock.name} src={lock.imageUrlAbsolute} />
                <Box display="flex" flexDirection="row" padding="15px 15px 0px 15px">
                    <Box mr={1} />
                    {
                        lock.recommended ? (
                            <Flex flexGrow="none" display="flex" alignItems="center">
                                <Box marginRight="1px" />
                                <Badge variant="outline" colorScheme="green">Recommended</Badge>
                                <Box marginRight="8px" />
                            </Flex>
                        ) : (
                            <Flex flexGrow="none" display="flex" alignItems="center">
                                <Box marginRight="1px" />
                                <Badge variant="outline" colorScheme="red">Not Recommended</Badge>
                                <Box marginRight="8px" />
                            </Flex>
                        )
                    }
                </Box>
                {/* <Box padding="15px 15px 0px 15px">
                    <Font fontWeight={900} fontSize={24} variant="primary">{restaurant.name}</Font>
                    <Box display="flex" direction="row" alignItems="flex-start" marginTop={2}>
                        <Flex display="flex" direction="row" justifyContent="flex-start" alignItems="center">
                            <AiFillStar color="#FBB03B" />
                            <Box marginRight="1px" />
                            <Font fontSize="12px" fontWeight={900}>{calculateOverallRating({ ratings: restaurant.ratings })}</Font>
                            <Box marginRight="8px" />
                        </Flex>
                        <Flex display="flex" direction="row" justifyContent="center" alignItems="center">
                            <BiMapPin color="#9b2c2c" />
                            <Box marginRight="1px" />
                            <Font fontSize="12px" fontWeight={900}>{restaurant.location.city}, {restaurant.location.state}</Font>
                            <Box marginRight="8px" />
                        </Flex>
                        <Flex display="flex" direction="row" justifyContent="center" alignItems="center">
                            <ImSpoonKnife color="#646464" />
                            <Box marginRight="1px" />
                            <Font fontSize="12px" fontWeight={900}>{restaurant.cuisine}</Font>
                            <Box marginRight="8px" />
                        </Flex>
                        <Flex display="flex" direction="row" justifyContent="flex-end" alignItems="center">
                            <IoIosPricetag color="#6ad66a" />
                            <Box marginRight="1px" />
                            <Font fontSize="12px" fontWeight={900}>{restaurant.price}</Font>
                        </Flex>
                    </Box>
                    <Box marginTop="10px" />
                    <Font fontSize="12px">{restaurant.notes}</Font>
                    <Box marginTop="10px" width="100%" display="flex" justifyContent="flex-end">
                        <Button block onClick={() => history.push(`/view/${props.id}`)}>View Details</Button>
                    </Box>
                </Box> */}
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