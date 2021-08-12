
import { Button } from '@chakra-ui/react';
import React from 'react';
import { PRIMARY_COLOR_SCHEME } from '../constants';
import { useGlobalState } from '../providers/root';

const AbsoluteButton = (props) => {
    const { meta } = useGlobalState();
    const fixedButton = {
        position: "fixed",
        bottom: props.bottom ? props.bottom : meta.isInstalled ? 100 : 20,
        right: props.right || 20,
        left: props.left,
        top: props.top,
        borderRadius: props.round && 100,
        width: props.round && 50,
        height: props.round && 50,
    }
    if (props.isHidden) {
        return null;
    }
    return (
        <Button
            leftIcon={props.leftIcon}
            zIndex={1000}
            margin={props.margin}
            backgroundColor="gray.50"
            color="gray.900"
            isLoading={props.loading}
            disabled={props.disabled}
            boxShadow="base"
            style={fixedButton}
            _active={{
                boxShadow: "xs"
            }}
            _focus={{
                boxShadow: "xs"
            }}
            _hover={{
                boxShadow: "lg"
            }}
            onClick={props.onClick}
            {...props}>
            {props.children}
        </Button>
    )
}

export default AbsoluteButton;