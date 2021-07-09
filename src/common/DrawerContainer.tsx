import React from 'react';
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerCloseButton,
} from "@chakra-ui/react"

interface IDrawerContainer {
    isOpen: boolean;
    children: React.ReactElement;
    onClose(): void;
    title: string;
}

const DrawerContainer = (props: IDrawerContainer) => {
    return (
        <Drawer placement="bottom" isOpen={props.isOpen} onClose={props.onClose} size="lg" motionPreset="slideInBottom">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>{props.title}</DrawerHeader>
                <DrawerCloseButton />
                <DrawerBody>
                    {props.children}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerContainer;