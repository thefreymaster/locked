import React from 'react';
import { useGlobalState } from '../providers/root';
import { Switch, Route, Redirect } from 'react-router-dom';
import Welcome from '../components/Welcome';
import { Spinner } from '@chakra-ui/react';
import Wrapper from '../common/Wrapper';
import LocksMap from '../components/LocksMap';
import RequestLocation from '../components/RequestLocation';

const Router = () => {
    const { firebase, meta } = useGlobalState();

    if (firebase.isValidatingAuthentication || meta.fetching) {
        return (
            <Wrapper>
                <Spinner />
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
            <Route exact path="/add">
                <LocksMap />
            </Route>
            <Route exact path="/*">
                <Redirect to="/" />
            </Route>
        </Switch>
    )
}

export default Router;