import React from 'react';
import AbsoluteButton from '../../common/AbsoluteButton';
import { useGlobalState } from '../../providers/root';
import { MdGpsFixed } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { BiAddToQueue } from 'react-icons/bi';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

interface IMapActions {
    setViewport(viewPort: any): void;
    viewport: any;
    newUserOnOpen(): void;
    onOpen(): void;
}

const MapActions = (props: IMapActions) => {
    const { meta, coordinates, firebase, user } = useGlobalState();
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
            <AbsoluteButton right={meta.isInstalled ? 20 : "none"} left={meta.isInstalled ? "none" : 20} top={meta.isInstalled && 60} onClick={() => {
                props.setViewport({
                    ...props.viewport,
                    latitude: coordinates.live.latitude,
                    longitude: coordinates.live.longitude,
                    zoom: 14,
                })
            }}>
                <MdGpsFixed />
            </AbsoluteButton>
            {firebase.isAuthenticated && (
                <AbsoluteButton onClick={() => {
                    history.push('/add');
                    if (user.isNew) {
                        props.newUserOnOpen();
                    }
                    else {
                        props.onOpen();
                    }
                }}>
                    <BiAddToQueue />
                </AbsoluteButton>
            )}
        </>
    )
}

export default MapActions;