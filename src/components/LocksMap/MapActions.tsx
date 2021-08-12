import React from 'react';
import AbsoluteButton from '../../common/AbsoluteButton';
import { useGlobalState } from '../../providers/root';
import { useHistory } from 'react-router-dom';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { Box, FormControl, Tag, Switch, Text } from '@chakra-ui/react';

interface IMapActions {
    setViewport(viewPort: any): void;
    viewport: any;
    newUserOnOpen(): void;
    onOpen(): void;
}

const MapActions = (props: IMapActions) => {
    const { firebase, user, dispatch, coordinates, meta } = useGlobalState();
    const { center } = coordinates;
    const history = useHistory();
    return (
        <>
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
                    Add To Map
                </AbsoluteButton>
            )}
            <Tag boxShadow="base" borderRadius="md" backgroundColor="gray.50" padding={1} position="absolute" top={meta.isInstalled ? 100 : 70} right="20px" zIndex="10" display="flex" flexDir="row" alignItems="center" justifyContent="center">
                <Box pr="2" pl="2">Center Marker</Box>
                <Switch onChange={() => center.showCenter ? dispatch({ type: 'HIDE_CENTER' }) : dispatch({ type: 'SHOW_CENTER' })} colorScheme="orange" size="md" />
            </Tag>
        </>
    )
}

export default MapActions;