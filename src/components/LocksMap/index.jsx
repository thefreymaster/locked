import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import React from 'react';
import { useGlobalState } from '../../providers/root';
import { Redirect } from 'react-router-dom';
import { Box, Fade, useDisclosure } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import './users-map.scss';
import { calculateOverallRating } from '../../utils/calcOverallRating';
import DeviceWrapper from '../../common/DeviceWrapper';
import DrawerContainer from '../../common/DrawerContainer';
import AddRack from '../AddRack';
import RackPopup from './Popup';
import { getLiveGPSCoordinates } from '../../utils/gps';
import { isMobile } from 'react-device-detect';
import BikeRackMarker from './BikeRackMarker';
import NewUserModal from '../NewUser/index';
import LottieLoading from '../../common/LottieLoading';
import MapActions from './MapActions';
import { CurrentCoordinates } from '../CurrentCoordinates/index';
import { MdClear } from 'react-icons/md';
import { CenterX } from './CenterX';
import { generateDbKey } from '../../utils/generateDbKey';
import firebaseApi from '../../api/firebase';

const Map = ReactMapboxGl({
    accessToken:
        process.env.REACT_APP_MAPBOX_TOKEN
});

const LocksMap = () => {
    const { coordinates, locks } = useGlobalState();
    const { id } = useParams();
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();

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
    if (id && !locks[id]) {
        return (
            <Redirect to="/map" />
        )
    }
    return (
        <DeviceWrapper>
            <MapContainer id={id} />
            <DrawerContainer title="Add Bike Rack" isOpen={isOpen} onClose={() => {
                history.push('/map');
                onClose();
            }}>
                <AddRack onClose={onClose} />
            </DrawerContainer>
        </DeviceWrapper>
    )
}


const MapContainer = (props) => {
    let initialViewport;
    const { locks, coordinates, dispatch } = useGlobalState();
    const { onOpen, onClose } = useDisclosure();
    const { isOpen: newUserIsOpen, onOpen: newUserOnOpen, onClose: newUserOnClose } = useDisclosure()

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
            zoom: 15,
        }
    }

    const [viewport, setViewport] = React.useState({ ...initialViewport });
    const [center, setCenter] = React.useState({ latitude: initialViewport.latitude, longitude: initialViewport.longitude })
    const [popupViewport, setPopupViewport] = React.useState({
        visible: props.id ? true : false,
        coordinates: lock ? [lock.location.long, lock.location.lat + 0.00009590001135] : [],
        lock: lock || {},
        id: props.id,
    })

    const MemorizedMap = React.useMemo(() => {
        if (!viewport) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <LottieLoading />
                </Box>
            )
        }
        return (<>
            <Map
                style="mapbox://styles/thefreymaster/ckke447ga0wla19k1cqupmrrz"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
                center={[viewport.longitude, viewport.latitude]}
                zoom={[viewport.zoom]}
                onDragEnd={({ transform }) => {
                    const { center } = transform;
                    dispatch({ type: "SET_CENTER_GPS_COORDINATES", payload: { latitude: center.lat, longitude: center.lng } });
                    dispatch({ type: 'SET_DB_KEY', payload: { dbKey: generateDbKey({ lat: center.lat, lng: center.lng }) } });
                    // firebaseApi.db.openDbConnection({ lat: center.lat, lng: center.lng, dispatch });
                }}
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
                            onOpen={onOpen}
                            onClose={onClose}
                        />
                    </Popup>
                )}
                <MarkerContainer coordinates={coordinates} />
            </Map>
            <MapActions
                setViewport={setViewport}
                viewport={viewport}
                newUserOnOpen={newUserOnOpen}
                onOpen={onOpen}
            />
            <NewUserModal isOpen={newUserIsOpen} onClose={newUserOnClose} onOpenAdd={onOpen} />
        </>)
    }, [viewport, popupViewport])

    return (
        <>
            <CurrentCoordinates />
            <CenterX />
            {MemorizedMap}
        </>
    );
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

const BikeRacksContainer = (props) => {
    const { locks } = useGlobalState();
    const history = useHistory();

    return Object.entries(locks).map(([key, value]) => {
        const { location, ratings } = value;
        const latAdjustmentPopup = isMobile ? 0.00015590001135 : 0.00015590001135;
        const latAdjustmentViewport = isMobile ? 0.00159590001135 : 0.00199590001135;
        const overallRating = calculateOverallRating({ ratings });
        return (
            <Marker onClick={() => {
                props.setPopupViewport({ visible: true, coordinates: [value.location.long, value.location.lat + latAdjustmentPopup], lock: value, id: key })
                props.setViewport({ zoom: 16, latitude: location.lat + latAdjustmentViewport, longitude: location.long });
                history.push(`/map/${key}`);
            }}
                key={`friend-marker-${key}`}
                coordinates={[location.long, location.lat]}
                className="rack-marker">
                {/* <div style={style}> */}
                <BikeRackMarker overallRating={overallRating} />
                {/* </div> */}
            </Marker>
        )
    })

}

const MarkerContainer = (props) => {
    const [coordinates, setCoordinates] = React.useState([props.coordinates.longitude, props.coordinates.latitude]);
    const [long, lat] = coordinates;

    React.useLayoutEffect(() => {
        getLiveGPSCoordinates(setCoordinates);
    }, [])

    return (
        <Marker style={{ zIndex: 2 }} key="you-marker" coordinates={[long, lat]}>
            <Fade in>
                <div className="you" />
            </Fade>
        </Marker>
    )
}

export default LocksMap;