export const authValidationComplete = {
  type: "FIREBASE_AUTHENTICATION_VERIFICATION_COMPLETE",
};

export const isFetching = { type: "IS_FETCHING" };

export const fetchingComplete = { type: "FETCHING_COMPLETE" };

export const isInstalledApp = { type: "IS_INSTALLED_APP" };

export const hasCoordinatesError = { type: "HAS_COORDINATES_ERROR" };

export const isGPSEnabled = { type: "IS_GPS_ENABLED" };

export const isGPSNotEnabled = { type: "IS_NOT_GPS_ENABLED" };

export const isDrawerVisible = { type: "SET_DRAWER_VISIBLE" };

export const isDrawerNotVisible = { type: "SET_DRAWER_NOT_VISIBLE" };

export const resetPopup = {
  type: "SET_POPUP",
  payload: {
    visible: false,
    coordinates: [],
    lock: {},
  },
};
