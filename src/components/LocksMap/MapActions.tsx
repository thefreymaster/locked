import React from 'react';
import AbsoluteButton from '../../common/AbsoluteButton';
import { useGlobalState } from '../../providers/root';
import { useHistory } from 'react-router-dom';
import { HiOutlineDocumentAdd } from 'react-icons/hi';

interface IMapActions {
    setViewport(viewPort: any): void;
    viewport: any;
    newUserOnOpen(): void;
    onOpen(): void;
}

const MapActions = (props: IMapActions) => {
    const { firebase, user } = useGlobalState();
    const history = useHistory();
    return (
        <>
            {/* {!meta.isInstalled && <>
                <AbsoluteButton right="none" left={20} bottom={120} onClick={() => props.setViewport({ ...props.viewport, zoom: props.viewport.zoom + 1 })}>
                    <RiAddLine />
                </AbsoluteButton>
                <AbsoluteButton right="none" left={20} bottom={75} onClick={() => props.setViewport({ ...props.viewport, zoom: props.viewport.zoom - 1 })}>
                    <RiSubtractLine />
                </AbsoluteButton>
            </>} */}
            {/* <AbsoluteButton left={20} onClick={() => {
                props.setViewport({
                    ...props.viewport,
                    latitude: coordinates.live.latitude,
                    longitude: coordinates.live.longitude,
                    zoom: 14,
                })
            }}>
                <MdGpsFixed />
            </AbsoluteButton> */}
            {firebase.isAuthenticated && (
                <AbsoluteButton rightIcon={<HiOutlineDocumentAdd />} onClick={() => {
                    history.push('/add');
                    if (user.isNew) {
                        props.newUserOnOpen();
                    }
                    else {
                        props.onOpen();
                    }
                }}>
                    Add
                </AbsoluteButton>
            )}
        </>
    )
}

export default MapActions;