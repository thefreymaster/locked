import React from "react";
import reducer from "./reducer";

export interface IDefaultState {
  firebase: {
    isValidatingAuthentication: boolean;
    isAuthenticated: boolean;
    isInitialized: boolean;
    isAuthenticatedError: boolean;
    user?: any;
    provider?: any;
  };
  meta: {
    isServerError: boolean;
    fetching: boolean;
    isDay: boolean;
    isInstalled: boolean;
    containsLocks?: boolean;
    dbKey: string;
    liveGPSEnabled: boolean;
    supported: boolean;
  };
  coordinates: {
    latitude?: number;
    longitude?: number;
    hasCoordinates: boolean;
    hasCoordinatesError: boolean;
    showCoordinates: boolean;
    live: {
      latitude?: number;
      longitude?: number;
    };
    center: {
      latitude?: number;
      longitude?: number;
      showCenter: boolean;
    };
  };
  locks: Array<{
    name: string;
    notes: string;
    location: {
      lat?: number;
      long?: number;
    };
    quality: number;
    safety: number;
    wouldYouLockHere: boolean;
    ratings: {
      illumination: number;
      quality: number;
      safety: number;
    };
    imageUrl?: string;
    imageUrlAbsolute?: string;
  }>;
  user: {
    isNew?: boolean;
    displayName?: string;
    email?: string;
    photoURL?: string;
    providerId?: string;
    uid?: string;
  };
  dispatch: any;
  alpha: {
    minimal: boolean;
  };
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
    isDay: false,
    isInstalled:
      localStorage.getItem("isInstalled") === "true" ? true : false || false,
    dbKey: "",
    supported: false,
    liveGPSEnabled:
      localStorage.getItem("gps-tracking") === "true" ? true : false,
  },
  coordinates: {
    hasCoordinates: false,
    hasCoordinatesError: false,
    showCoordinates:
      localStorage.getItem("center-coordinates") === "true" ? true : false,
    live: {},
    center: {
      showCenter:
        localStorage.getItem("center-marker") === "true" ? true : false,
    },
  },
  locks: [],
  user: {},
  dispatch: () => {},
  alpha: {
    minimal: false,
  },
};

const Context = React.createContext(defaultState);

export const useGlobalState = () => React.useContext(Context);

export const Provider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  return (
    <Context.Provider value={{ ...(state as IDefaultState), dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
