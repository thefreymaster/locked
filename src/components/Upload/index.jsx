import { Image, Box, Button, AspectRatio } from "@chakra-ui/react";
import React from "react";
import firebaseApi from "../../api/firebase";
import { useGlobalState } from "../../providers/root";
import "./upload.scss";

const Upload = (props) => {
  const { firebase } = useGlobalState();
  const [path, setPath] = React.useState("");
  const [name, setName] = React.useState("");

  const handleOnChange = (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    const [file] = files
    reader.onload = (e) => setPath(e.target.result);
    reader.readAsDataURL(file);
    setPath("");
    props.setIsUploading(true);
    firebaseApi.upload({
      file: file,
      uid: firebase.user.uid,
      form: props.form,
      setIsUploading: props.setIsUploading,
    });
  };
  return (
    <>
      <Button minW="100%">
        <label htmlFor="file-upload">Select Photo</label>
      </Button>
      <input
        onChange={(e) => handleOnChange(e)}
        id="file-upload"
        type="file"
        style={{ display: "none" }}
      />
      {path && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image
            src={path}
            className="upload"
            borderRadius={10}
            alt="restaurant"
            size="xlg"
            objectFit="cover"
            minH="500px"
            minW="300px"
          />
        </Box>
      )}
    </>
  );
};

export default Upload;
