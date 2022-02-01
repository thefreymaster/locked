import React from 'react';
import { useLocation } from 'react-router-dom';

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
    const location: any = useLocation();
    return (
        <Drawer placement="bottom" isOpen={props.isOpen || location.pathname.includes('/add') || location.pathname.includes('/edit')} onClose={props.onClose} size="lg" motionPreset="slideInBottom">
            <DrawerOverlay />
            <DrawerContent boxShadow="dark-lg">
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