import { Avatar, Box, Button } from '@chakra-ui/react';
import React from 'react';
import firebaseApi from '../../api/firebase';
import { useGlobalState } from '../../providers/root';
import "./upload.scss";

const Upload = (props) => {
    const { firebase } = useGlobalState();
    const [path, setPath] = React.useState("");

    const handleOnChange = (e) => {
        const { files } = e.target;
        const reader = new FileReader();
        reader.onload = (e) => setPath(e.target.result);
        reader.readAsDataURL(files[0]);
        setPath("");
        firebaseApi.upload({ file: files[0], uid: firebase.user.uid, form: props.form })
    }
    return (
        <>
            <Button minW="100%">
                <label for="file-upload">Select Photo</label>
            </Button>
            <input onChange={(e) => handleOnChange(e)} id="file-upload" type="file" style={{ display: "none" }} />
            {path && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Avatar
                        src={path}
                        className="upload"
                        borderRadius={10}
                        alt="restaurant"
                        size="xlg"
                    />
                </Box>
            )}
        </>
    )
}

export default Upload;
