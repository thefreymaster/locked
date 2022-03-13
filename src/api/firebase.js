import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import {
  authValidationComplete,
  fetchingComplete,
  isFetching,
} from "../actions";
import { generateDbKey } from "../utils/generateDbKey";

const onAuthChange = ({ dispatch }) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch({ type: "FIREBASE_AUTHENTICATION_SUCCESS", payload: { user } });
      firebaseApi.auth.setUser({ dispatch, uid: user.uid });
    }
    dispatch(authValidationComplete);
  });
};

const openDbConnection = ({ lat, lng, setLocks, dispatch }) => {
  const dbKey = generateDbKey({ lat, lng });
  dispatch({ type: "SET_DB_KEY", payload: { dbKey } });

  var refUpdates = firebase.database().ref(`locks/${dbKey}`);
  refUpdates.on("value", (snapshot) => {
    dispatch(isFetching);
    const snapshotValue = snapshot.val();
    setLocks(snapshotValue);
    dispatch(fetchingComplete);
  });
};

const openNewDbConnection = ({ dbKey, dispatch }) => {
  var refUpdates = firebase.database().ref(`locks/${dbKey}`);
  refUpdates.on("value", (snapshot) => {
    const snapshotValue = snapshot.val();
    if (snapshotValue) {
      dispatch({
        type: "POPULATE_NEW_DATA",
        payload: {
          locks: snapshotValue,
        },
      });
      dispatch(fetchingComplete);
    } else {
      dispatch(fetchingComplete);
    }
  });
};

const openSingleItmeDbConnection = ({ dbKey, id, showPopup, mapDispatch }) => {
  var refUpdates = firebase.database().ref(`locks/${dbKey}/${id}`);
  refUpdates.once("value", (snapshot) => {
    const snapshotValue = snapshot.val();
    mapDispatch({
      type: "SET_VIEWPORT",
      payload: { ...snapshotValue, visible: showPopup },
    });
  });
};

const openAuthConnection = ({ dispatch, showSuccessToast }) => {
  firebase
    .auth()
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        dispatch({
          type: "FIREBASE_AUTHENTICATION_SUCCESS",
          payload: { user: result.user },
        });
        setTimeout(() => {
          dispatch({ type: "TOGGLE_SETTINGS_DRAWER" });
        }, 500);
        showSuccessToast();
      }
      if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
        addUserLocation({ user: result.user, dispatch });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const signIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

const signOut = (dispatch, showInfoToast, history) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      setTimeout(() => {
        dispatch({ type: "FIREBASE_AUTHENTICATION_SIGN_OUT_SUCCESS" });
        showInfoToast();
        history.push("/map");
        setTimeout(() => {
          dispatch({ type: "TOGGLE_SETTINGS_DRAWER" });
        }, 1000);
      }, 500);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const addUserLocation = ({ user, dispatch }) => {
  const [provider] = user.providerData;
  var userListRef = firebase.database().ref(`users/${user.uid}`);
  userListRef
    .update({
      createdDate: new Date().toISOString(),
      isNew: true,
      ...provider,
    })
    .then(() => {
      dispatch(fetchingComplete);
    });
};

const add = ({ postData, uid, dispatch, toast, dbKey, onClose, history }) => {
  dispatch(isFetching);
  var listRef = firebase.database().ref(`locks/${dbKey}`);
  listRef
    .push({ ...postData, createdDate: new Date().toISOString(), author: uid })
    .then(() => {
      toast();
      dispatch(fetchingComplete);
      onClose();
      history.push("/map");
    });
};

const update = ({
  postData,
  dispatch,
  itemId,
  toast,
  onClose,
  history,
  dbKey,
}) => {
  dispatch(isFetching);
  var restaurantListRef = firebase.database().ref(`locks/${dbKey}/${itemId}`);
  restaurantListRef
    .update({ ...postData, modifiedData: new Date().toISOString() })
    .then(() => {
      toast();
      dispatch(fetchingComplete);
      onClose();
      history.push(`/map/${itemId}`);
    });
};

const remove = ({
  dispatch,
  history,
  itemId,
  onClose,
  setIsDeleting,
  toast,
  dbKey,
}) => {
  dispatch(isFetching);
  var restaurantListRef = firebase.database().ref(`locks/${dbKey}/${itemId}`);
  restaurantListRef.remove().then(() => {
    history.push("/map");
    toast();
    dispatch(fetchingComplete);
    setIsDeleting(false);
    onClose();
  });
};

const upload = ({ uid, file, form, setIsUploading }) => {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const imageRef = storageRef.child(`images/${uid}/${uuidv4()}`);
  const options = {
    maxSizeMB: 0.25,
    useWebWorker: true,
  };
  imageCompression(file, options)
    .then(function (compressedFile) {
      imageRef.put(compressedFile).then((snapshot) => {
        const { metadata } = snapshot;
        const { fullPath } = metadata;
        form.setFieldValue("imageUrl", fullPath);
        console.log("Uploaded a blob or file!");
        setIsUploading(false);
      });
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

const getImage = ({ fileUrl, lock, setLock }) => {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  return storageRef
    .child(fileUrl)
    .getDownloadURL()
    .then((url) => {
      setLock({ ...lock, imageUrlAbsolute: url });
    });
};

const refresh = ({ lat, lng, dispatch }) => {
  const dbKey = `${lng.toFixed(0) + lat.toFixed(0)}`;
  var refUpdates = firebase.database().ref(`locks/${dbKey}`);
  refUpdates.on("value", (snapshot) => {
    dispatch(isFetching);
    const snapshotValue = snapshot.val();
    if (snapshotValue) {
      dispatch({
        type: "POPULATE_DATA",
        payload: {
          locks: snapshotValue,
        },
      });
      dispatch(fetchingComplete);
    } else {
      dispatch(fetchingComplete);
    }
  });
};

const oldUser = ({ uid }) => {
  var listRef = firebase.database().ref(`users/${uid}`);
  listRef.update({ isNew: false }).then(() => {});
};

const setUser = ({ dispatch, uid }) => {
  var listRef = firebase.database().ref(`users/${uid}`);
  listRef.on("value", (snapshot) => {
    const snapshotValue = snapshot.val();
    if (snapshotValue) {
      dispatch({
        type: "POPULATE_USER_DATA",
        payload: {
          user: snapshotValue,
        },
      });
    }
  });
};

const firebaseApi = {
  auth: {
    signIn,
    signOut,
    oldUser,
    setUser,
    onAuthChange,
  },
  add,
  db: {
    openDbConnection,
    openNewDbConnection,
    openSingleItmeDbConnection,
    openAuthConnection,
  },
  update,
  remove,
  upload,
  refresh,
  getImage,
};

export default firebaseApi;
