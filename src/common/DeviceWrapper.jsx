import React from 'react';
import { isMobile } from "react-device-detect";

const DeviceWrapper = (props) => {

    return (
        <div className={isMobile ? "mobile-device-wrapper" : "desktop-device-wrapper"}>
            {props.children}
        </div>
    )
}

export default DeviceWrapper;