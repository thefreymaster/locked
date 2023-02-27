import { useGlobalState } from '../../providers/root';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './users-map.scss';
import DeviceWrapper from '../../common/DeviceWrapper';
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