import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useGlobalState } from '../../providers/root';
import { getGPSCoordinates } from '../../utils/gps';
import { Redirect, useParams } from 'react-router-dom';
import Wrapper from '../../common/Wrapper';
import { usePageVisibility } from 'react-page-visibility';

const RequestLocation = () => {
    const { coordinates, dispatch, firebase } = useGlobalState();
    const { id } = useParams();
    const isVisible = usePageVisibility()

    useEffect(() => {
        if (firebase.isAuthenticated && isVisible) {
            getGPSCoordinates(dispatch, firebase.user)
        }
    }, [isVisible])

    if (coordinates.hasCoordinatesError) {
        return (
            <Wrapper>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Alert status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>GPS Error!</AlertTitle>
                        <AlertDescription>Your location could not be determined.</AlertDescription>
                    </Alert>
                </Box>
            </Wrapper>
        )
    }
    if (!coordinates.hasCoordinates) {
        return (
            <Wrapper>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Spinner />
                </Box>
            </Wrapper>
        )
    }
    if (id) {
        return (
            <Redirect to={`/map/${id}`} />
        )
    }
    return (
        <Redirect to="/map" />
    )
}

export default RequestLocation;