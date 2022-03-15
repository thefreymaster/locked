import { useGlobalState } from '../../providers/root';
import { Redirect } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import './users-map.scss';
import DeviceWrapper from '../../common/DeviceWrapper';
import DrawerContainer from '../../common/DrawerContainer';
import AddRack from '../AddRack';
import { MapDataGetter } from './components/MapRenderer';

const LocksMap = () => {
    const { coordinates } = useGlobalState();
    const { id } = useParams();

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
            <MapDataGetter />
        </DeviceWrapper>
    )
}

export default LocksMap;