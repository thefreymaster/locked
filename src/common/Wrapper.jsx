import React from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../providers/root';

const Wrapper = (props) => {
    const { meta } = useGlobalState();
    const { location } = useHistory();
    const inline = {
        margin: meta.isInstalled ? "125px 20px 20px 20px" : "90px 20px 20px 20px",
        minHeight: meta.isInstalled ? window.innerHeight - 230 : window.innerHeight - 110,
        minWidth: window.innerWidth - 40,
        justifyContent: location.pathname === "/" ? "center" : "flex-start",
    }
    return (
        <div style={inline} className={isMobile ? "mobile-wrapper" : "desktop-wrapper"}>
            {props.children}
        </div>
    )
}

export default Wrapper;