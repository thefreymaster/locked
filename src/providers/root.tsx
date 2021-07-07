import React from 'react';
import reducer from './reducer';

export interface IDefaultState {
    firebase: {
        isValidatingAuthentication: boolean,
        isAuthenticated: boolean,
        isInitialized: boolean,
        isAuthenticatedError: boolean,
        user: object,
    },
    meta: {
        isServerError: boolean,
        fetching: boolean;
        isDay: boolean;
        isInstalled: boolean;
        containsLocks?: boolean;
    },
    coordinates: {
        latitude?: number;
        longitude?: number;
        hasCoordinates: boolean;
        hasCoordinatesError: boolean;
    },
    locks: Array<{
        name: string;
        notes: string;
        location: Geolocation;
        quality: number;
        safety: number;
        wouldYouLockHere: boolean;
    }>
    dispatch: any;
}

const defaultState: IDefaultState = {
    firebase: {
        isValidatingAuthentication: true,
        isAuthenticated: false,
        isInitialized: false,
        isAuthenticatedError: false,
        user: {},
    },
    meta: {
        isServerError: false,
        fetching: true,
        isDay: new Date().getHours() >= 6 && new Date().getHours() <= 17 ? true : false,
        isInstalled: false,
    },
    coordinates: {
        hasCoordinates: false,
        hasCoordinatesError: false,
    },
    locks: [],
    dispatch: () => { },
}

const Context = React.createContext(defaultState);

export const useGlobalState = () => React.useContext(Context);

export const Provider = (props: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducer, defaultState);
    return (
        <Context.Provider value={{ ...state as IDefaultState, dispatch }}>
            {props.children}
        </Context.Provider>
    )
}