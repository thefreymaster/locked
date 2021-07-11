

const reducer = (state: any, action: any) => {
    const newState = { ...state };
    const { payload } = action;

    switch (action.type) {
        case 'FIREBASE_INITIALIZED_SUCCESS': {
            newState.firebase.isInitialized = true;
            break;
        }
        case 'FIREBASE_AUTHENTICATION_SUCCESS': {
            const [provider] = payload.user.providerData;
            newState.firebase.isAuthenticated = true;
            newState.firebase.isValidatingAuthentication = false;
            newState.firebase.user = payload.user;
            newState.firebase.provider = provider;
            break;
        }
        case 'FIREBASE_AUTHENTICATION_SIGN_OUT_SUCCESS': {
            newState.firebase.isAuthenticated = false;
            newState.firebase.user = {};
            break;
        }
        case 'FIREBASE_AUTHENTICATION_VERIFICATION_COMPLETE': {
            newState.firebase.isValidatingAuthentication = false;
            break;
        }
        case 'TOGGLE_SETTINGS_DRAWER': {
            newState.meta.settingsDrawerIsOpen = !state.meta.settingsDrawerIsOpen;
            break;
        }
        case 'TOGGLE_FETCHING': {
            newState.meta.fetching = !state.meta.fetching;
            break;
        }
        case 'IS_FETCHING': {
            newState.meta.fetching = true;
            break;
        }
        case 'SET_GPS_COORDINATES': {
            newState.coordinates.latitude = payload.latitude;
            newState.coordinates.longitude = payload.longitude;
            newState.coordinates.hasCoordinates = true;
            break;
        }
        case 'SET_USER_GPS_COORDINATES': {
            newState.coordinates.live.latitude = payload.latitude;
            newState.coordinates.live.longitude = payload.longitude;
            break;
        }
        case 'SET_HAS_GPS_COORDINATES': {
            newState.coordinates.hasCoordinates = true;
            break;
        }
        case 'FETCHING_COMPLETE': {
            newState.meta.fetching = false;
            break;
        }
        case 'IS_SERVER_ERROR': {
            newState.meta.isServerError = true;
            break;
        }
        case 'IS_INSTALLED_APP': {
            newState.meta.isInstalled = true;
            break;
        }
        case 'HAS_COORDINATES_ERROR': {
            newState.coordinates.hasCoordinatesError = true;
            break;
        }
        case 'POPULATE_DATA': {
            newState.locks = payload.locks;
            newState.meta.containsLocks = true;
            break;
        }
        case 'SET_IMAGE_ABSOLUTE_URL': {
            newState.locks[payload.id].imageUrlAbsolute = payload.url;
            break;
        }
        case 'SET_DB_KEY': {
            newState.meta.dbKey = payload.dbKey;
            break;
        }
        default:
            console.error(new Error());
    }
    console.log({ action, oldState: state, newState })
    return newState;
}

export default reducer;