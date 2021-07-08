import React from 'react';
import Flex from '../../common/Flex';
import './header.scss';
import SettingsMenu from '../SettingsMenu';
import { Box, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../../providers/root';
import { BsFillShieldLockFill } from 'react-icons/bs';

const Header = () => {
    const { meta } = useGlobalState();
    const history = useHistory();
    const fixed = {
        position: 'fixed',
        top: 0,
        width: "100%",
        zIndex: 6,
    }

    return (
        <Flex style={{ ...fixed }}
            transitionBackground
            display="flex"
            backgroundColor="#ffffff80"
            alignItems="center"
            padding={meta.isInstalled ? "50px 20px 15px 20px" : "15px 20px"}
            className="header"
        >
            <Flex display="flex" direction="column" justifyContent="center">
                <Flex display="flex" direction="row" margin="0px 0px 0px 0px" hoverCursor alignItems="center">
                    <BsFillShieldLockFill />
                    <Box marginRight={2} />
                    <Text onClick={() => history.push("/")} fontWeight="bold">Locked</Text>
                    <Box marginRight={2} flexGrow={1} />
                </Flex>
            </Flex>
            <Flex />
            <Flex flexGrow="none" margin="0px 10px 0px 0px" />
            {!meta.isInstalled && <SettingsMenu />}
        </Flex>
    )
};

export default Header;
