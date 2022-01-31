import React from 'react';
import { useGlobalState } from '../providers/root';
import { Switch, Route, Redirect } from 'react-router-dom';
import Welcome from '../components/Welcome';
import Wrapper from '../common/Wrapper';
import LocksMap from '../components/LocksMap';
import RequestLocation from '../components/RequestLocation';
import LottieLoading from '../common/LottieLoading';
import ChangeLog from '../components/ChangeLog/index';
import Account from '../components/Account';
import DeviceWrapper from '../common/DeviceWrapper';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
} from "@chakra-ui/react";

const Router = () => {
    const { firebase, meta, coordinates } = useGlobalState();

    if (coordinates.hasCoordinatesError) {
        return (
            <Wrapper>
                <DeviceWrapper>
                    <Alert status="error" display="flex" flexDir="row">
                        <AlertIcon boxSize="32px" />
                        <Box flexDir="column">
                            <AlertTitle mr={2}>Location error!</AlertTitle>
                            <AlertDescription>Location services are required for Lock & Key to work.  Please try again.</AlertDescription>
                        </Box>
                    </Alert>
                </DeviceWrapper>
            </Wrapper>
        )
    }

    if (firebase.isValidatingAuthentication || meta.fetching) {
        return (
            <Wrapper>
                <LottieLoading />
            </Wrapper>
        )
    }
    return (
        <Switch>
            <Route exact path="/">
                {
                    firebase.isAuthenticated ?
                        <Redirect to="/map" /> :
                        <Welcome />
                }
            </Route>
            <Route exact path="/request">
                <RequestLocation />
            </Route>
            <Route exact path="/request/:id">
                <RequestLocation />
            </Route>
            <Route exact path="/map">
                <LocksMap />
            </Route>
            <Route exact path="/map/:id">
                <LocksMap />
            </Route>
            <Route exact path="/edit/:id">
                <LocksMap />
            </Route>
            <Route exact path="/details/:id">
                <LocksMap />
            </Route>
            <Route exact path="/add">
                <LocksMap />
            </Route>
            <Route exact path="/changes">
                <ChangeLog />
            </Route>
            <Route exact path="/account">
                <Account />
            </Route>
            <Route exact path="/*">
                <Redirect to="/" />
            </Route>
        </Switch>
    )
}

export default Router;