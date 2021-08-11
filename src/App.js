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
import Footer from './components/Footer';
import { useHistory } from 'react-router-dom';

const App = () => {

  const { dispatch, coordinates, meta, firebase } = useGlobalState();
  const toast = useToast();
  const history = useHistory();


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
      firebaseApi.auth.onAuthChange({ dispatch });
      firebaseApi.db.openAuthConnection({ dispatch, showSuccessToast })
      getGPSCoordinates({ dispatch, firebaseApi, showSuccessToast, firebase });
    }
  }, [])

  return (
    <Zindex zIndex={1}>
      {!meta.isInstalled && <Header />}
      <Router />
      {meta.isInstalled && <Footer history={history} />}
    </Zindex>
  );
}

export default App;
