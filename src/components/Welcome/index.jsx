import { Box, Button, SlideFade, Spinner, toast, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import firebaseApi from '../../api/firebase';
import Font from '../../common/Font';
import Wrapper from '../../common/Wrapper';
import { useGlobalState } from '../../providers/root';
import { isMobile } from 'react-device-detect';
import './welcome.scss';
import { PRIMARY_COLOR_SCHEME } from '../../constants';
import DeviceWrapper from '../../common/DeviceWrapper';

const Welcome = () => {
    const { firebase, dispatch } = useGlobalState();
    const { isOpen, onToggle } = useDisclosure();

    React.useEffect(() => {
        onToggle();
    }, [])

    const showSuccessToast = () => {
        toast({
            title: "Authenticated",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }
    if (firebase.isValidatingAuthentication) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <Spinner />
            </Box>
        )
    }
    if (!firebase.isValidatingAuthentication && firebase.isAuthenticated) {
        return <Redirect to="/map" />
    }
    const background = {
        // backgroundImage: `url(${CUTTING_BOARD})`,
        width: window.innerWidth,
        height: window.innerHeight,
        position: 'absolute',
        top: 0,
        filter: 'blur(10px)',
        transform: 'scale(1)',
        zIndex: -1,
    }
    return (
        <div style={{
            minHeight: "100%",
            minWidth: "100%"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <SlideFade direction="bottom" in={isOpen}>
                    <Wrapper>
                        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
                            <Font fontWeight={900} fontSize={isMobile ? 72 : 124} variant="primary">Locked</Font>
                            <Font fontWeight={600} fontSize={18}>Find a secure safe bike rack</Font>
                            <Box mt={5} display="flex" flexDir={isMobile ? "column" : "row"}>
                                <Button size="lg" colorScheme={PRIMARY_COLOR_SCHEME} disabled={firebase.isValidatingAuthentication} onClick={() => firebaseApi.auth.signIn(dispatch, showSuccessToast)}>Sign Up With Google</Button>
                                <Box m={2} d="flex" justifyContent="center" alignItems="center">
                                    Or
                                </Box>
                                <Button size="lg" colorScheme={PRIMARY_COLOR_SCHEME} disabled={firebase.isValidatingAuthentication} onClick={() => firebaseApi.auth.signIn(dispatch, showSuccessToast)}>Sign In With Google</Button>
                            </Box>
                        </Box>
                    </Wrapper>
                    {/* <div style={background} className="cover-background" /> */}
                </SlideFade>
            </div>
        </div>
    )
}

export default Welcome;