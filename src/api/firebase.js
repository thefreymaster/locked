import imageCompression from 'browser-image-compression';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import { authValidationComplete, fetchingComplete, isFetching } from "../actions";
import { generateKey } from "../utils/generateKey";

const verify = (dispatch, showSuccessToast) => {
    firebase.auth()
        .getRedirectResult()
        .then((result) => {
            console.log(result)
            if (result.credential) {
                dispatch({ type: 'FIREBASE_AUTHENTICATION_SUCCESS', payload: { user: result.user } });
                setTimeout(() => {
                    dispatch({ type: 'TOGGLE_SETTINGS_DRAWER' });
                }, 500);
                showSuccessToast();
            }
            if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
                console.log('new')
            }
        }).catch((error) => {
            console.error(error);
        });
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch({ type: 'FIREBASE_AUTHENTICATION_SUCCESS', payload: { user } });
            var refUpdates = firebase.database().ref('locks');
            refUpdates.on('value', (snapshot) => {
                dispatch(isFetching);
                const snapshotValue = snapshot.val();
                if (snapshotValue) {
                    dispatch({
                        type: 'POPULATE_DATA',
                        payload: {
                            locks: snapshotValue
                        }
                    });
                    dispatch(fetchingComplete);
                }
                else {
                    dispatch(fetchingComplete);
                }
            })
        }
        else {
            dispatch(authValidationComplete);
            dispatch(fetchingComplete);
        }

    })
}

const signIn = (dispatch, showSuccessToast) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}

const signOut = (dispatch, showInfoToast, history) => {
    firebase.auth().signOut().then(function () {
        setTimeout(() => {
            dispatch({ type: 'FIREBASE_AUTHENTICATION_SIGN_OUT_SUCCESS' });
            showInfoToast();
            history.push("/")
            setTimeout(() => {
                dispatch({ type: 'TOGGLE_SETTINGS_DRAWER' });
            }, 1000);
        }, 500);
    }).catch(function (error) {
        console.error(error);
    });
}

export const addUserLocation = ({ postData, user, dispatch }) => {
    const [provider] = user.providerData;
    var userListRef = firebase.database().ref(`users/${user.uid}`);
    userListRef.update({
        ...postData,
        createdDate: new Date().toISOString(),
        provider
    }).then(() => {
        dispatch(fetchingComplete);
    });
}

const add = ({ postData, uid, dispatch, history, toast }) => {
    dispatch(isFetching);
    var listRef = firebase.database().ref(`locks`);
    listRef.push({ ...postData, createdDate: new Date().toISOString(), author: uid }).then(() => {
        toast();
        dispatch(fetchingComplete);
        history.push("/");
    });
}

const update = ({ postData, uid, dispatch, history, itemId, toast }) => {
    dispatch(isFetching);
    var restaurantListRef = firebase.database().ref(`users/${uid}/restaurants/${itemId}`);
    console.log({ ...postData, modifiedData: new Date().toISOString() })
    restaurantListRef.update({ ...postData, modifiedData: new Date().toISOString() }).then(() => {
        toast();
        dispatch(fetchingComplete)
        history.goBack();
    });
}

const remove = ({ uid, dispatch, history, itemId, onClose, setIsDeleting, toast }) => {
    dispatch(isFetching);
    var restaurantListRef = firebase.database().ref(`users/${uid}/restaurants/${itemId}`);
    restaurantListRef.remove().then(() => {
        toast();
        dispatch(fetchingComplete);
        setIsDeleting(false);
        onClose();
        history.push("/");
    });
}

const upload = ({ uid, file, form }) => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${uid}/${file.name}`);
    const options = {
        maxSizeMB: 0.5,
        useWebWorker: true
    }
    imageCompression(file, options)
        .then(function (compressedFile) {
            imageRef.put(compressedFile).then((snapshot) => {
                const { metadata } = snapshot;
                const { fullPath } = metadata;
                form.setFieldValue("imageUrl", fullPath);
                console.log('Uploaded a blob or file!');
            });
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

const getImage = ({ id, fileUrl, dispatch }) => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    return storageRef.child(fileUrl).getDownloadURL()
        .then((url) => dispatch({ type: 'SET_IMAGE_ABSOLUTE_URL', payload: { url, id } }))
}

const firebaseApi = {
    verify,
    auth: {
        signIn,
        signOut,
    },
    add,
    update,
    remove,
    upload,
    getImage,
}

export default firebaseApi;
