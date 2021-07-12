import { Box, Button, Divider, SlideFade, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import firebaseApi from '../../api/firebase';
import Font from '../../common/Font';
import Wrapper from '../../common/Wrapper';
import { BLUE } from '../../constants';
import { useGlobalState } from '../../providers/root';
import Authenticated from '../Authenticated';
import { useHistory } from 'react-router-dom';
import LottieLoading from '../../common/LottieLoading';

const Account = () => {
    const { dispatch, firebase, meta } = useGlobalState();
    const { isOpen, onToggle } = useDisclosure();
    const history = useHistory();

    const toast = useToast();

    const showSuccessToast = () => {
        toast({
            title: "Authenticated",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }
    const showInfoToast = () => {
        toast({
            title: "See ya!",
            status: "info",
            duration: 3000,
            isClosable: true,
        })
    }

    React.useEffect(() => {
        onToggle();
    }, []);

    if (firebase.isValidatingAuthentication || meta.fetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <LottieLoading />
            </Box>
        )
    }
    return (
        <SlideFade direction="bottom" in={isOpen}>
            <Wrapper justifyContent="flex-start">
                <Box width="100%" display="flex" alignItems="flex-start" flexDirection="column">
                    <Font fontWeight={900}>Account</Font>
                    <Divider />
                    <Box margin="15px">
                        {firebase.isAuthenticated ? (
                            <Authenticated />
                        ) : (
                            <Button onClick={() => firebaseApi.auth.signIn(dispatch, showSuccessToast)}>
                                <FontAwesomeIcon color={BLUE} icon={faGoogle} />
                                <Box mr={3} />
                                Sign In With Google
                            </Button>
                        )}
                    </Box>
                    <Divider />
                    <Box margin="10px" />
                    {firebase.isAuthenticated && (
                        <Box minW="100%">
                            <Button onClick={() => firebaseApi.auth.signOut(dispatch, showInfoToast, history)}>Sign Out</Button>
                        </Box>
                    )}
                </Box>
            </Wrapper>
        </SlideFade>

    )
}

export default Account;