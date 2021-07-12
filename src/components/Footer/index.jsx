import React from 'react';

import Flex from '../../common/Flex';
import { Box } from '@chakra-ui/react';
import Font from '../../common/Font';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../../providers/root';
import { ImMap2 } from 'react-icons/im';
import { RiAccountCircleLine, RiRestaurant2Line } from 'react-icons/ri';


const Footer = (props) => {
    const { meta, coordinates, firebase } = useGlobalState();
    const location = useLocation();
 
    const { hasCoordinates } = coordinates;
    const { pathname } = location;
    const fixed = {
        position: 'sticky',
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 2,
        minHeight: 90,
        maxHeight: 90,
        borderTop: "1px solid #edf2f7",
    }

    if(!firebase.isAuthenticated || !meta.isInstalled){
        return null;
    }
    return (
        <Box width="100%" style={{ ...fixed }} display="flex" backgroundColor="#fff" padding={meta.isInstalled ? "15px 0px 30px 0px" : "15px 20px"}>
            {hasCoordinates &&
                <Flex height="32px" onClick={() => props.history.push("/map")} width="33%" display="flex" justifyContent="center" alignItems="center" direction="column">
                    <ImMap2 size="24px" color={pathname.includes("/map") && "#d49f00"} />
                    <Font fontWeight={pathname.includes("/map") && 900} fontSize={12} color={pathname.includes("/map") && "#d49f00"}>Map</Font>
                </Flex>
            }
            <Flex height="32px" onClick={() => props.history.push("/account")} width="33%" display="flex" justifyContent="center" alignItems="center" direction="column">
                <RiAccountCircleLine size="24px" color={pathname === "/account" && "#d49f00"} />
                <Font fontSize={12} color={pathname === "/account" && "#d49f00"}>Account</Font>
            </Flex>
        </Box>
    )
};

export default Footer;
