import { IconButton } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useHistory } from "react-router-dom";

export const BackButton = () => {
  const history = useHistory();
  return (
    <IconButton marginRight="2" onClick={() => history.goBack()} borderRadius={100} aria-label="button" icon={<BiArrowBack />} />
  );
};
