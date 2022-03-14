import React from "react";
import { ILock } from "../interfaces/ILock";

const DEFAULT_LATITUDE = 42.35698;
const DEFAULT_LONGITUDE = -71.06388;

export interface IDefaultState {
  viewport: {
    width: number;
    height: number;
    latitude: number;
    longitude: number;
    zoom: number;
  };
  popup: {
    visible: boolean;
    coordinates: Array<number>;
    lock?: ILock;
    id?: string;
  };
  drawer: {
    visible: boolean;
  };
  dispatch(v: any): void;
}

const defaultState: IDefaultState = {
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
    zoom: 15,
  },
  popup: {
    visible: false,
    coordinates: [],
  },
  drawer: {
    visible: false,
  },
  dispatch: () => {},
};

const reducer = (state: any, action: any) => {
  const newState = { ...state };
  const { payload } = action;

  switch (action.type) {
    case "SET_POPUP_IMAGE_URL": {
      newState.popup!.lock!.imageUrlAbsolute = payload.url;
      break;
    }
    case "SET_POPUP": {
      newState.popup = payload;
      break;
    }
    case "SET_VIEWPORT": {
      newState.viewport = payload;
      break;
    }
    case "SET_DRAWER_VISIBLE": {
      newState.drawer.visible = true;
      break;
    }
    case "SET_DRAWER_NOT_VISIBLE": {
      newState.drawer.visible = false;
      break;
    }
    default:
      console.error(new Error());
  }
  console.log({ action, oldState: state, newState });
  return newState;
};

const Context = React.createContext(defaultState);

export const useMapState = () => React.useContext(Context);

export const Provider = (props: {
  children: React.ReactNode;
  latidude: number;
  longitude: number;
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...defaultState,
    viewport: {
      ...defaultState.viewport,
      latitude: props.latidude,
      longitude: props.longitude,
    },
  });
  console.log({ mapState: state });
  return (
    <Context.Provider
      value={{
        ...(state as IDefaultState),
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
