const reducer = (state: any, action: any) => {
  const newState = { ...state };
  const { payload } = action;

  switch (action.type) {
    case "FIREBASE_INITIALIZED_SUCCESS": {
      newState.firebase.isInitialized = true;
      break;
    }
    case "FIREBASE_AUTHENTICATION_SUCCESS": {
      const [provider] = payload.user.providerData;
      newState.firebase.isAuthenticated = true;
      newState.firebase.isValidatingAuthentication = false;
      newState.firebase.user = payload.user;
      newState.firebase.provider = provider;
      break;
    }
    case "FIREBASE_AUTHENTICATION_SIGN_OUT_SUCCESS": {
      newState.firebase.isAuthenticated = false;
      newState.firebase.user = {};
      break;
    }
    case "FIREBASE_AUTHENTICATION_VERIFICATION_COMPLETE": {
      newState.firebase.isValidatingAuthentication = false;
      break;
    }
    case "TOGGLE_SETTINGS_DRAWER": {
      newState.meta.settingsDrawerIsOpen = !state.meta.settingsDrawerIsOpen;
      break;
    }
    case "TOGGLE_FETCHING": {
      newState.meta.fetching = !state.meta.fetching;
      break;
    }
    case "IS_FETCHING": {
      newState.meta.fetching = true;
      break;
    }
    case "SET_GPS_COORDINATES": {
      newState.coordinates.latitude = payload.latitude;
      newState.coordinates.longitude = payload.longitude;
      newState.coordinates.hasCoordinates = true;
      break;
    }
    case "SET_USER_GPS_COORDINATES": {
      newState.coordinates.live.latitude = payload.latitude;
      newState.coordinates.live.longitude = payload.longitude;
      break;
    }
    case "SET_CENTER_GPS_COORDINATES": {
      newState.coordinates.center.latitude = payload.latitude;
      newState.coordinates.center.longitude = payload.longitude;
      break;
    }
    case "SET_HAS_GPS_COORDINATES": {
      newState.coordinates.hasCoordinates = true;
      break;
    }
    case "FETCHING_COMPLETE": {
      newState.meta.fetching = false;
      break;
    }
    case "IS_SERVER_ERROR": {
      newState.meta.isServerError = true;
      break;
    }
    case "IS_INSTALLED_APP": {
      newState.meta.isInstalled = true;
      break;
    }
    case "HAS_COORDINATES_ERROR": {
      newState.coordinates.hasCoordinatesError = true;
      break;
    }
    case "POPULATE_NEW_DATA": {
      newState.locks = payload.locks;
      break;
    }
    case "POPULATE_DATA": {
      newState.locks = payload.locks;
      newState.meta.containsLocks = true;
      break;
    }
    case "SET_IMAGE_ABSOLUTE_URL": {
      newState.locks[payload.id].imageUrlAbsolute = payload.url;
      break;
    }
    case "SET_DB_KEY": {
      newState.meta.dbKey = payload.dbKey;
      break;
    }
    case "POPULATE_USER_DATA": {
      newState.user = payload.user;
      break;
    }
    case "SHOW_CENTER": {
      newState.coordinates.center.showCenter = true;
      localStorage.setItem("center-marker", "true");
      break;
    }
    case "HIDE_CENTER": {
      newState.coordinates.center.showCenter = false;
      localStorage.setItem("center-marker", "false");
      break;
    }
    case "SHOW_CURRENT_COORDINATES": {
      newState.coordinates.showCoordinates = true;
      localStorage.setItem("center-coordinates", "true");
      break;
    }
    case "HIDE_CURRENT_COORDINATES": {
      newState.coordinates.showCoordinates = false;
      localStorage.setItem("center-coordinates", "false");
      break;
    }
    case "IS_ALPHA": {
      newState.alpha.minimal = true;
      break;
    }
    case "IS_NOT_ALPHA": {
      newState.alpha.minimal = false;
      break;
    }
    default:
      console.error(new Error());
  }
  console.log({ action, oldState: state, newState });
  return newState;
};

export default reducer;
