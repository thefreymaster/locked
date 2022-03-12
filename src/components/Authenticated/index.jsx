import { Avatar, Fade, Tag, useColorMode } from '@chakra-ui/react';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from '../../common/Flex';
import Font from '../../common/Font';
import { BACKGROUND_COLOR_HW, BLUE } from '../../constants';
import { useGlobalState } from '../../providers/root';
import './avatar.scss';

const Authenticated = (props) => {
    const { colorMode } = useColorMode();

    const { firebase } = useGlobalState();

    const inlineTag = {
        backgroundColor: colorMode === 'light' ? BACKGROUND_COLOR_HW : BLUE,
    }
    if (firebase.isAuthenticated) {
        const { user } = firebase;
        const { providerData } = user;
        const [data] = providerData;
        if (props.avatarOnly) {
            return (
                <Fade in={firebase.isAuthenticated}>
                    <Avatar
                        boxShadow="0 0px 0px -1px #ffffff80, 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)"
                        borderRadius="1000px"
                        bg="red.800"
                        size={props.avatarSize}
                        name={data.displayName}
                        src={data.photoURL}
                    />
                </Fade>
            )
        }
        return (
            <Flex display="flex" alignItems="center" justifyContent={props.justifyContent || 'center'} direction="row" width="100%" marginLeft="15px">
                <Avatar
                    size="sm"
                    name={data.displayName}
                    src={data.photoURL}
                />
                <Flex margin="0px 10px 0px 0px" flexGrow="none" />
                <Flex display="flex" direction="column" flexGrow="none" justifyContent="center">
                    <Font color={BLUE} fontWeight={500} fontSize={16}>{data.displayName}</Font>
                    <Flex margin="0px 0px 5px 0px" flexGrow="none" />
                    <Tag size="sm" style={inlineTag}>
                        <Flex display="flex" direction="row" justifyContent="center" alignItems="center">
                            <FontAwesomeIcon color={colorMode === 'light' ? BLUE : BACKGROUND_COLOR_HW} icon={faGoogle} />
                            <Flex margin="0px 5px 0px 0px" flexGrow="none" />
                            <Font fontSize="11px" color={colorMode === 'light' ? BLUE : BACKGROUND_COLOR_HW} fontWeight={500}>Google Auth</Font>
                        </Flex>
                    </Tag>
                </Flex>
            </Flex>
        )
    }
    return null;
}

export default Authenticated;