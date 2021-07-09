import './App.css';
import React from 'react';
import Router from './router/index';
import Zindex from './common/Zindex';
import { useGlobalState } from './providers/root';
import { useToast } from '@chakra-ui/react';
import firebaseApi from './api/firebase';
import Header from './components/Header';
import { getGPSCoordinates } from './utils/gps';
import { isInstalledApp } from './actions';

const App = () => {

  const { dispatch } = useGlobalState();
  const toast = useToast();


  const showSuccessToast = () => {
    toast({
      title: "Authenticated",
      description: "We've successfully signed you in.",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  React.useEffect(() => {
    if (navigator.standalone) {
      dispatch(isInstalledApp)
    }
    if (navigator.geolocation) {
      getGPSCoordinates(dispatch);
    }
    firebaseApi.verify(dispatch, showSuccessToast);
  }, [])

  return (
    <Zindex zIndex={1}>
      <Header />
      <Router />
    </Zindex>
  );
}

export default App;
