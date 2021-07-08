import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useToast,
} from "@chakra-ui/react"
import React from 'react';
import firebaseApi from "../../api/firebase";
import { useHistory } from 'react-router-dom';
import { useGlobalState } from "../../providers/root";

const DeleteRack = (props) => {
    const { dispatch, firebase } = useGlobalState();
    const history = useHistory();

    const onClose = () => props.setIsOpen(false);
    const cancelRef = React.useRef();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const toast = useToast();

    const showSuccessToast = () => {
        toast({
            title: "Bike rack deleted",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: 'bottom-left'
        })
    }

    return (
        <AlertDialog
            isOpen={props.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent margin={15}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Bike Rack
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button isLoading={isDeleting} colorScheme="red" onClick={() => {
                            setIsDeleting(true);
                            firebaseApi.remove({ uid: firebase.user.uid, dispatch, history, itemId: props.id, onClose, setIsDeleting, toast: showSuccessToast })
                        }} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default DeleteRack;